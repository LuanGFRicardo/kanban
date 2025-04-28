// Importa o React, useState e useEffect para gerenciar estados e efeitos colaterais
import React, { useEffect, useState } from "react";

// Importa o axios para fazer requisições HTTP
import axios from "axios";

// Importa os componentes que serão usados na página
import Column from "../components/Column.js";
import CardTarefa from "../components/CardTarefa.js";
import ModalNovaTarefa from "../components/ModalNovaTarefa.js";
import ModalTarefa from "../components/ModalTarefa.js";
import Navbar from "../components/Navbar.js";

// Componente principal da página de tarefas
function TarefaPage() {
  // Estados para armazenar tarefas, exibir modal de nova tarefa e tarefa selecionada
  const [tarefas, setTarefas] = useState([]);
  const [mostrarModalNova, setMostrarModalNova] = useState(false);
  const [tarefaSelecionada, setTarefaSelecionada] = useState(null);

  // Função para buscar todas as tarefas do servidor
  async function buscarTarefas() {
    try {
      const resposta = await axios.get("http://localhost:3000/api/tarefas");
      setTarefas(resposta.data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  }

  // Função para cadastrar uma nova tarefa
  async function cadastrarTarefa(titulo, descricao) {
    try {
      await axios.post('http://localhost:3000/api/tarefas', {
        titulo,
        descricao,
        status: 'Aguardando',
        quadroId: 1
      });
      setMostrarModalNova(false); // Fecha o modal após cadastrar
      buscarTarefas(); // Atualiza a lista de tarefas
    } catch (error) {
      console.error('Erro ao cadastrar tarefa:', error.response?.data || error.message);
    }
  }

  // Função para salvar as alterações de uma tarefa editada
  async function salvarTarefaEditada(id, novoTitulo, novaDescricao) {
    try {
      await axios.put(`http://localhost:3000/api/tarefas/${id}`, {
        titulo: novoTitulo,
        descricao: novaDescricao
      });
      setTarefaSelecionada(null); // Fecha o modal após salvar
      buscarTarefas(); // Atualiza a lista
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error.response?.data || error.message);
    }
  }

  // Função para deletar uma tarefa
  async function deletarTarefa(id) {
    const confirmacao = window.confirm('Deseja realmente excluir esta tarefa?');
    if (!confirmacao) return;

    try {
      await axios.delete(`http://localhost:3000/api/tarefas/${id}`);
      setTarefaSelecionada(null);
      buscarTarefas();
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error.response?.data || error.message);
    }
  }

  // useEffect para buscar tarefas ao carregar a página
  useEffect(() => {
    buscarTarefas();
  }, []);

  // Função para filtrar tarefas por status
  const tarefasPorStatus = (status) => {
    return tarefas.filter((tarefa) => tarefa.status === status);
  };

  // Renderiza a página
  return (
    <>
      <Navbar />
      <div className="kanban-board">
        <Column titulo="Aguardando">
          <button onClick={() => setMostrarModalNova(true)} className="btn-adicionar">Nova Tarefa</button>
          {tarefasPorStatus("Aguardando").map((tarefa) => (
            <CardTarefa
              key={tarefa.id}
              id={tarefa.id}
              titulo={tarefa.titulo}
              descricao={tarefa.descricao}
              onClick={() => setTarefaSelecionada(tarefa)}
            />
          ))}
        </Column>

        <Column titulo="Em Andamento">
          {tarefasPorStatus("Em Andamento").map((tarefa) => (
            <CardTarefa
              key={tarefa.id}
              id={tarefa.id}
              titulo={tarefa.titulo}
              descricao={tarefa.descricao}
              onClick={() => setTarefaSelecionada(tarefa)}
            />
          ))}
        </Column>

        <Column titulo="Concluída">
          {tarefasPorStatus("Concluída").map((tarefa) => (
            <CardTarefa
              key={tarefa.id}
              id={tarefa.id}
              titulo={tarefa.titulo}
              descricao={tarefa.descricao}
              onClick={() => setTarefaSelecionada(tarefa)}
            />
          ))}
        </Column>
      </div>

      {/* Modal para criar nova tarefa */}
      {mostrarModalNova && (
        <ModalNovaTarefa 
          onClose={() => setMostrarModalNova(false)} 
          onCreate={cadastrarTarefa} 
        />
      )}

      {/* Modal para editar ou deletar tarefa */}
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

// Exporta a página
export default TarefaPage;
