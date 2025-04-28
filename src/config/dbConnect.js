// Importa a classe Sequelize da biblioteca 'sequelize'
import { Sequelize } from "sequelize";

// Cria uma nova instância do Sequelize configurada para usar o banco de dados SQLite
const db = new Sequelize({
    dialect: "sqlite",           // Define o tipo de banco de dados como SQLite
    storage: "./database.sqlite",// Especifica o caminho do arquivo onde o banco será armazenado
    logging: false               // Desativa os logs de SQL no console (opcional, para manter o terminal limpo)
});  

// Exporta a instância 'db' para ser usada em outros arquivos do projeto
export default db;
