// Importa o React
import React from "react";

// Importa o arquivo de estilos para o card da tarefa
import "../styles/CardTarefa.css";

// Componente que representa um cartão individual de tarefa
function CardTarefa({ id, titulo, descricao, onClick }) {
  return (
    <div className="card-tarefa" onClick={onClick}>
      <h4 className="card-titulo">{titulo}</h4> {/* Exibe o título da tarefa */}
      <p className="card-descricao">{descricao}</p> {/* Exibe a descrição da tarefa */}
    </div>
  );
}

// Exporta o componente para ser utilizado em outras partes da aplicação
export default CardTarefa;
