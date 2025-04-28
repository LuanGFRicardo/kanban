// Importa os tipos de dados do Sequelize
import { DataTypes } from "sequelize";

// Importa a conexão com o banco de dados
import db from "../config/dbConnect.js";

// Define o modelo 'Usuario', que será mapeado como uma tabela no banco de dados
const Usuario = db.define('Usuario', {
  
  // Coluna 'nome', do tipo texto (STRING), obrigatória (não pode ser nula)
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },

  // Coluna 'email', do tipo texto (STRING), obrigatória e única (não pode repetir emails)
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

  // Coluna 'senha', do tipo texto (STRING), obrigatória
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Exporta o modelo 'Usuario' para ser usado no controller
export default Usuario;
