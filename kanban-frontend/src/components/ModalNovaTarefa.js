// Importa o React e o hook useState para gerenciar o estado interno do modal
import React, { useState } from "react";

// Importa o arquivo de estilos para o modal de nova tarefa
import "../styles/ModalNovaTarefa.css";

// Componente que representa o modal para criar uma nova tarefa
function ModalNovaTarefa({ onClose, onCreate }) {
  const [titulo, setTitulo] = useState(""); // Estado para o título da nova tarefa
  const [descricao, setDescricao] = useState(""); // Estado para a descrição da nova tarefa

  // Função que trata o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(titulo, descricao); // Chama a função recebida para criar a tarefa
    setTitulo(""); // Limpa o campo de título
    setDescricao(""); // Limpa o campo de descrição
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Nova Tarefa</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
          <textarea
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          ></textarea>
          <div className="modal-buttons">
            <button type="submit" className="btn-criar">Criar</button> {/* Botão para criar a tarefa */}
            <button type="button" onClick={onClose} className="btn-cancelar">Cancelar</button> {/* Botão para fechar o modal */}
          </div>
        </form>
      </div>
    </div>
  );
}

// Exporta o componente para uso
export default ModalNovaTarefa;
