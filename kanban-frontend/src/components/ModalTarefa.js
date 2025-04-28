// Importa o React e os hooks useState e useEffect
import React, { useState, useEffect } from "react";

// Importa o arquivo de estilos do modal de edição de tarefa
import "../styles/ModalTarefa.css";

// Componente que representa o modal para visualizar, editar ou deletar uma tarefa existente
function ModalTarefa({ tarefa, onClose, onSave, onDelete }) {
  const [titulo, setTitulo] = useState(""); // Estado para o título da tarefa
  const [descricao, setDescricao] = useState(""); // Estado para a descrição da tarefa

  // Atualiza os campos do modal sempre que a tarefa muda
  useEffect(() => {
    if (tarefa) {
      setTitulo(tarefa.titulo);
      setDescricao(tarefa.descricao);
    }
  }, [tarefa]);

  // Função que trata o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(tarefa.id, titulo, descricao); // Chama a função para salvar alterações
  };

  // Se não houver tarefa selecionada, não renderiza nada
  if (!tarefa) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Informações da Tarefa</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Título da Tarefa"
            required
          />
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descrição da Tarefa"
            required
          />
          <div className="modal-buttons">
            <button type="submit" className="btn-salvar">Salvar</button> {/* Botão para salvar alterações */}
            <button type="button" onClick={() => onDelete(tarefa.id)} className="btn-deletar">Deletar</button> {/* Botão para deletar a tarefa */}
            <button type="button" onClick={onClose} className="btn-fechar">Cancelar</button> {/* Botão para fechar o modal */}
          </div>
        </form>
      </div>
    </div>
  );
}

// Exporta o componente para uso
export default ModalTarefa;
