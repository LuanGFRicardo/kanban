// Importa o tipo de dados (DataTypes) da biblioteca Sequelize
import { DataTypes } from "sequelize";

// Importa a conexão com o banco de dados
import db from "../config/dbConnect.js";

// Define o modelo 'Tarefa', que representa a tabela de tarefas no banco de dados
const Tarefa = db.define('Tarefa', {
  
  // Define a coluna 'titulo' do tipo STRING (texto) e que não pode ser nula
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },

  // Define a coluna 'descricao' do tipo STRING (texto) e que não pode ser nula
  descricao: {
    type: DataTypes.STRING,
    allowNull: true
  },

  // Define a coluna 'status' como um ENUM, aceitando apenas os valores especificados
  status: {
    type: DataTypes.STRING,
    allowNull: true
  },

  // Define a coluna 'quadroId' como um número inteiro (INTEGER) que não pode ser nulo
  quadroId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }

}, {
  // Configurações adicionais do modelo:
  timestamps: true // Cria automaticamente as colunas 'createdAt' e 'updatedAt'
});

// Exporta o modelo 'Tarefa' para ser usado em outras partes do projeto
export default Tarefa;
