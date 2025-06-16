// Importa o middleware CORS para permitir requisições de origens diferentes (Cross-Origin Resource Sharing)
import cors from "cors"; 

// Importa o Express para criar o servidor
import express from "express";

// Importa a configuração de conexão com o banco de dados
import db from "./config/dbConnect.js";

// Importa o dotenv para gerenciar variáveis de ambiente (como porta, banco, etc.)
import dotenv from "dotenv";

// Importa as rotas relacionadas às tarefas
import tarefaRoutes from "./routes/tarefaRoutes.js";

import quadroRoutes from "./routes/quadrosRoutes.js";

// Importa as rotas relacionadas aos usuários
import usuarioRoutes from "./routes/usuarioRoutes.js";

// um único ponto de entrada para os models
import "./models/index.js";

// Carrega as variáveis do arquivo .env
dotenv.config();

// Cria a aplicação Express
const app = express();

// Configura o servidor para aceitar requisições JSON
app.use(express.json());

// Aplica o middleware CORS para permitir que o servidor aceite requisições de diferentes origens
app.use(cors());

// Conecta ao banco de dados e sincroniza os modelos com as tabelas
db.sync()
  .then(() => {
    console.log("Banco de dados conectado e sincronizado com sucesso!"); // Se a conexão for bem-sucedida
  })
  .catch((error) => {
    console.error("Erro ao conectar no banco de dados:", error); // Se der erro na conexão
  });

// Define as rotas para usuários, utilizando o prefixo /api/usuarios
app.use("/api/usuarios", usuarioRoutes);

// Define as rotas para tarefas, utilizando o prefixo /api/tarefas
app.use("/api/tarefas", tarefaRoutes);

app.use("/api/quadros", quadroRoutes);

app.use("/api/colunas", colunaRoutes);

// Exporta a instância do app para ser usada no servidor principal (server.js)
export default app;
