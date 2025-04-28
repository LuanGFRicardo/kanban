// Importa o React
import React from "react";

// Importa o arquivo de estilos da coluna
import "../styles/Column.css";

// Componente que representa uma coluna do Kanban (Ex: Aguardando, Em Andamento, Concluída)
function Column({ titulo, children }) {
  return (
    <div className="column">
      <h3 className="column-title">{titulo}</h3> {/* Título da coluna */}
      <div className="column-content">
        {children} {/* Renderiza os cartões de tarefas dentro da coluna */}
      </div>
    </div>
  );
}

// Exporta o componente para uso no layout
export default Column;
