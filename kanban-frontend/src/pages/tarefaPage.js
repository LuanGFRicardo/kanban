import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import CardTarefa from "../components/CardTarefa.js";
import ModalNovaTarefa from "../components/ModalNovaTarefa.js";
import ModalTarefa from "../components/ModalTarefa.js";
import AppNavbar from "../components/Navbar.js";

function TarefaPage({ quadroId, onVoltar }) {
  const [colunas, setColunas] = useState([]);
  const [tarefas, setTarefas] = useState([]);
  const [mostrarModalNova, setMostrarModalNova] = useState(false);
  const [colunaParaNovaTarefa, setColunaParaNovaTarefa] = useState(null);
  const [tarefaSelecionada, setTarefaSelecionada] = useState(null);
  const [mensagem, setMensagem] = useState({ tipo: "", texto: "" });

  const [editandoColunaId, setEditandoColunaId] = useState(null);
  const [nomeColunaEditando, setNomeColunaEditando] = useState("");
  const [novaColunaAtiva, setNovaColunaAtiva] = useState(false);
  const [nomeNovaColuna, setNomeNovaColuna] = useState("");

  const token = localStorage.getItem("token");

  const buscarColunas = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/colunas", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const colunasFiltradas = res.data.filter((c) => c.quadroId === quadroId);
      setColunas(colunasFiltradas);
    } catch {
      setMensagem({ tipo: "danger", texto: "Erro ao buscar colunas" });
    }
  }, [token, quadroId]);

  const buscarTarefas = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/tarefas", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const tarefasFiltradas = res.data.filter((t) => t.quadroId === quadroId);
      setTarefas(tarefasFiltradas);
    } catch {
      setMensagem({ tipo: "danger", texto: "Erro ao buscar tarefas" });
    }
  }, [token, quadroId]);

  useEffect(() => {
    buscarColunas();
    buscarTarefas();
  }, [buscarColunas, buscarTarefas]);

  const cadastrarTarefa = async (titulo, descricao, colunaId, status) => {
    try {
      await axios.post("http://localhost:3000/api/tarefas", {
        titulo, descricao, status, quadroId, colunaId,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMostrarModalNova(false);
      setColunaParaNovaTarefa(null);
      buscarTarefas();
      setMensagem({ tipo: "success", texto: "Tarefa criada com sucesso!" });
    } catch {
      setMensagem({ tipo: "danger", texto: "Erro ao criar tarefa" });
    }
  };

  const salvarTarefaEditada = async (id, novoTitulo, novaDescricao, novoStatus) => {
    try {
      await axios.put(`http://localhost:3000/api/tarefas/${id}`, {
        titulo: novoTitulo,
        descricao: novaDescricao,
        status: novoStatus,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTarefaSelecionada(null);
      buscarTarefas();
      setMensagem({ tipo: "success", texto: "Tarefa atualizada com sucesso!" });
    } catch {
      setMensagem({ tipo: "danger", texto: "Erro ao atualizar tarefa" });
    }
  };

  const deletarTarefa = async (id) => {
    if (!window.confirm("Deseja realmente excluir esta tarefa?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/tarefas/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTarefaSelecionada(null);
      buscarTarefas();
      setMensagem({ tipo: "success", texto: "Tarefa excluída com sucesso!" });
    } catch {
      setMensagem({ tipo: "danger", texto: "Erro ao excluir tarefa" });
    }
  };

  const salvarEdicaoColuna = async (id) => {
    if (!nomeColunaEditando.trim()) return;
    try {
      await axios.put(`http://localhost:3000/api/colunas/${id}`, {
        nome: nomeColunaEditando,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditandoColunaId(null);
      buscarColunas();
      setMensagem({ tipo: "success", texto: "Coluna atualizada!" });
    } catch {
      setMensagem({ tipo: "danger", texto: "Erro ao editar coluna." });
    }
  };

  const criarColunaInline = async () => {
    if (!nomeNovaColuna.trim()) return;
    try {
      await axios.post("http://localhost:3000/api/colunas", {
        nome: nomeNovaColuna,
        ordem: colunas.length + 1,
        quadroId,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNomeNovaColuna("");
      setNovaColunaAtiva(false);
      buscarColunas();
      setMensagem({ tipo: "success", texto: "Coluna criada com sucesso!" });
    } catch {
      setMensagem({ tipo: "danger", texto: "Erro ao criar coluna." });
    }
  };

  const deletarColuna = async (id) => {
    if (!window.confirm("Deseja realmente excluir esta coluna?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/colunas/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      buscarColunas();
      setMensagem({ tipo: "success", texto: "Coluna excluída!" });
    } catch {
      setMensagem({ tipo: "danger", texto: "Erro ao excluir coluna." });
    }
  };

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const tarefaMovida = tarefas.find((t) => t.id.toString() === draggableId);
    const novaColunaId = parseInt(destination.droppableId);

    try {
      await axios.put(`http://localhost:3000/api/tarefas/${draggableId}`, {
        titulo: tarefaMovida.titulo,
        descricao: tarefaMovida.descricao,
        status: tarefaMovida.status,
        colunaId: novaColunaId,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      buscarTarefas();
    } catch {
      setMensagem({ tipo: "danger", texto: "Erro ao mover tarefa" });
    }
  };

  return (
    <>
      <AppNavbar onVoltar={onVoltar}/>

      {mensagem.texto && (
        <div className="position-fixed top-0 end-0 m-4" style={{ zIndex: 1050 }}>
          <div className={`alert alert-${mensagem.tipo} alert-dismissible fade show shadow`} role="alert">
            {mensagem.texto}
            <button type="button" className="btn-close" onClick={() => setMensagem({ tipo: "", texto: "" })}></button>
          </div>
        </div>
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban-board d-flex gap-3 p-3 overflow-auto" style={{ minHeight: '90vh', background: '#fff' }}>
          {colunas.map((coluna) => (
            <Droppable droppableId={coluna.id.toString()} key={coluna.id}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-dark text-white rounded-3 shadow-sm p-3"
                  style={{ minWidth: '280px', position: 'relative' }}
                >
                  <div className="position-absolute top-0 end-0 m-2 d-flex gap-1">
                    <button className="btn btn-sm btn-outline-light" onClick={() => {
                      setEditandoColunaId(coluna.id);
                      setNomeColunaEditando(coluna.nome);
                    }}>✏️</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => deletarColuna(coluna.id)}>❌</button>
                  </div>

                  {editandoColunaId === coluna.id ? (
                    <input
                      className="form-control form-control-sm mb-2"
                      value={nomeColunaEditando}
                      onBlur={() => salvarEdicaoColuna(coluna.id)}
                      onChange={(e) => setNomeColunaEditando(e.target.value)}
                      autoFocus
                    />
                  ) : (
                    <h5 className="fw-semibold mb-3">{coluna.nome}</h5>
                  )}

                  <button
                    className="btn btn-outline-light btn-sm w-100 mb-2"
                    onClick={() => {
                      setColunaParaNovaTarefa(coluna.id);
                      setMostrarModalNova(true);
                    }}
                  >
                    + Adicionar um cartão
                  </button>

                  {tarefas.filter((t) => t.colunaId === coluna.id).map((t, index) => (
                    <Draggable draggableId={t.id.toString()} index={index} key={t.id}>
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <CardTarefa
                            id={t.id}
                            titulo={t.titulo}
                            status={t.status}
                            onClick={() => setTarefaSelecionada(t)}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}

          {novaColunaAtiva ? (
            <div className="bg-light p-3 rounded-3" style={{ minWidth: '280px' }}>
              <input
                className="form-control form-control-sm"
                placeholder="Nome da nova coluna"
                value={nomeNovaColuna}
                onChange={(e) => setNomeNovaColuna(e.target.value)}
                onBlur={criarColunaInline}
                autoFocus
              />
            </div>
          ) : (
            <div
              className="d-flex align-items-center justify-content-center bg-secondary bg-opacity-75 text-white rounded-3 px-3 py-2"
              style={{ minWidth: '280px', height: '100px', cursor: 'pointer' }}
              onClick={() => setNovaColunaAtiva(true)}
            >
              <span className="fw-semibold">+ Adicionar outra lista</span>
            </div>
          )}
        </div>
      </DragDropContext>

      {mostrarModalNova && (
        <ModalNovaTarefa
          show={mostrarModalNova}
          onClose={() => setMostrarModalNova(false)}
          onCreate={(titulo, descricao, status) =>
            cadastrarTarefa(titulo, descricao, colunaParaNovaTarefa, status)
          }
        />
      )}

      {tarefaSelecionada && (
        <ModalTarefa
          tarefa={tarefaSelecionada}
          onClose={() => setTarefaSelecionada(null)}
          onSave={salvarTarefaEditada}
          onDelete={deletarTarefa}
        />
      )}
    </>
  );
}

export default TarefaPage;
