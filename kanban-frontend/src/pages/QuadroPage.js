import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import TarefaPage from "./tarefaPage";
import AppNavbar from "../components/Navbar"; // Navbar sem a seta

function QuadroPage() {
  const [quadros, setQuadros] = useState([]);
  const [quadroSelecionado, setQuadroSelecionado] = useState(null);
  const [novoQuadro, setNovoQuadro] = useState("");

  const token = localStorage.getItem("token");

  const buscarQuadros = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/quadros", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setQuadros(res.data);
    } catch (error) {
      console.error("Erro ao buscar quadros:", error);
    }
  }, [token]);

  const criarQuadro = async () => {
    if (!novoQuadro.trim()) return;
    try {
      await axios.post(
        "http://localhost:3000/api/quadros",
        { nome: novoQuadro },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNovoQuadro("");
      buscarQuadros();
    } catch (error) {
      console.error("Erro ao criar quadro:", error);
    }
  };

  const deletarQuadro = async (id) => {
    if (!window.confirm("Deseja realmente remover este quadro?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/quadros/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuadroSelecionado(null);
      buscarQuadros();
    } catch (error) {
      console.error("Erro ao excluir quadro:", error);
    }
  };

  const editarQuadro = async (id, nomeAtual) => {
    const novoNome = window.prompt("Digite o novo nome do quadro:", nomeAtual);
    if (!novoNome || novoNome.trim() === nomeAtual) return;
    try {
      await axios.put(
        `http://localhost:3000/api/quadros/${id}`,
        { nome: novoNome.trim() },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      buscarQuadros();
    } catch (error) {
      console.error("Erro ao editar quadro:", error);
    }
  };

  useEffect(() => {
    buscarQuadros();
  }, [buscarQuadros]);

  if (!token) {
    return <p className="text-center mt-5">Você precisa estar logado para visualizar seus quadros.</p>;
  }

  if (quadroSelecionado) {
    return (
      <TarefaPage
        quadroId={quadroSelecionado}
        onVoltar={() => setQuadroSelecionado(null)}
      />
    );
  }

  return (
    <>
      <AppNavbar /> {/* Navbar sem a seta de voltar */}

      <div className="container mt-4">
        <h2 className="mb-4 text-center">Seus Quadros</h2>

        <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
          {quadros.map((quadro) => (
            <div key={quadro.id} className="col">
              <div className="card h-100 shadow-sm">
                <div
                  className="card-body"
                  style={{ cursor: "pointer" }}
                  onClick={() => setQuadroSelecionado(quadro.id)}
                >
                  <h5 className="card-title">{quadro.nome}</h5>
                </div>
                <div className="card-footer d-flex gap-2 justify-content-start">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      editarQuadro(quadro.id, quadro.nome);
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      deletarQuadro(quadro.id);
                    }}
                  >
                    ❌
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="card p-3 shadow-sm">
          <h5 className="mb-3">Criar novo quadro</h5>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Nome do novo quadro"
              value={novoQuadro}
              onChange={(e) => setNovoQuadro(e.target.value)}
            />
            <button className="btn btn-success" onClick={criarQuadro}>
              Criar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuadroPage;
