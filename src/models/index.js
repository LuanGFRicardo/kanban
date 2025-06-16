// Importa os modelos definidos em seus respectivos arquivos
import Tarefa from "./Tarefa.js";
import Coluna from "./Coluna.js";
import Quadro from "./Quadro.js";
import Usuario from "./Usuario.js";

// RELACIONAMENTO: COLUNA ↔ TAREFA (1:N)
// Uma coluna pode conter várias tarefas
Coluna.hasMany(Tarefa, {
  foreignKey: "colunaId",   // Campo em Tarefa que referencia a Coluna
  onDelete: "CASCADE",      // Ao excluir uma Coluna, exclui suas Tarefas
  onUpdate: "CASCADE",      // Ao atualizar o ID da Coluna, reflete nas Tarefas
});


// RELACIONAMENTO: TAREFA → COLUNA (N:1)
// Cada tarefa pertence a uma única coluna
Tarefa.belongsTo(Coluna, {
  foreignKey: "colunaId",   // Campo em Tarefa que referencia a Coluna
});

// RELACIONAMENTO: COLUNA → QUADRO (N:1)
// Cada coluna pertence a um único quadro
Coluna.belongsTo(Quadro, {
  foreignKey: "quadroId",   // Campo em Coluna que referencia o Quadro
});


// RELACIONAMENTO: QUADRO ↔ COLUNA (1:N)
// Um quadro pode conter várias colunas
Quadro.hasMany(Coluna, {
  foreignKey: "quadroId",   // Campo em Coluna que referencia o Quadro
  onDelete: "CASCADE",      // Ao excluir um Quadro, exclui suas Colunas
  onUpdate: "CASCADE",      // Ao atualizar o ID do Quadro, reflete nas Colunas
});


// RELACIONAMENTO: USUÁRIO ↔ QUADRO (1:N)
// Um usuário pode ter vários quadros
Usuario.hasMany(Quadro, {
  foreignKey: "usuarioId",  // Campo em Quadro que referencia o Usuário
});

// RELACIONAMENTO: QUADRO → USUÁRIO (N:1)
// Cada quadro pertence a um único usuário
Quadro.belongsTo(Usuario, {
  foreignKey: "usuarioId",  // Campo em Quadro que referencia o Usuário
});

// Exporta os modelos com os relacionamentos aplicados
export { Tarefa, Coluna, Quadro, Usuario };