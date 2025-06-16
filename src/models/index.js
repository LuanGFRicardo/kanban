// Importa os modelos definidos em seus respectivos arquivos
import Tarefa from "./Tarefa.js";
import Coluna from "./Coluna.js";
import Quadro from "./Quadro.js";

// Define o relacionamento entre Coluna e Tarefa (1:N):
// Uma coluna pode conter várias tarefas
Coluna.hasMany(Tarefa, {
  foreignKey: "colunaId",  // A chave estrangeira na tabela Tarefa que referencia a Coluna
  onDelete: "CASCADE",     // Ao deletar uma coluna, todas as tarefas associadas serão removidas
  onUpdate: "CASCADE"      // Ao alterar o ID da coluna, o valor será atualizado nas tarefas também
});

// Cada tarefa pertence a uma única coluna (N:1)
Tarefa.belongsTo(Coluna, {
  foreignKey: "colunaId"   // Chave estrangeira usada na associação
});

Quadro.hasMany(Coluna, {
  foreignKey: "quadroId",  // A chave estrangeira na tabela Coluna que referencia o Quadro
  onDelete: "CASCADE",     // Ao deletar um quadro, todas as colunas associadas serão removidas
  onUpdate: "CASCADE"      // Ao alterar o ID do quadro, o valor será atualizado nas colunas
});

// Exporta os modelos com os relacionamentos aplicados
export { Tarefa, Coluna, Quadro};
