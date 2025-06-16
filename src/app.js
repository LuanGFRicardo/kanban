// Importa o middleware CORS para permitir requisições de origens diferentes (Cross-Origin Resource Sharing)
import cors from "cors"; 

// Importa o framework Express para criar o servidor
import express from "express";

// Importa a configuração de conexão com o banco de dados
import db from "./config/dbConnect.js";

// Importa o pacote dotenv para gerenciar variáveis de ambiente (.env)
import dotenv from "dotenv";

// um único ponto de entrada para os models
import "./models/index.js"; // simples, limpo e modular

// Importa o arquivo de rotas
import tarefaRoutes from "./routes/tarefaRoutes.js";
import quadroRoutes from "./routes/quadrosRoutes.js";
import colunaRoutes from "./routes/colunasRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Cria uma instância do Express
const app = express();

// Configura o servidor para aceitar requisições com JSON no corpo
app.use(express.json());

// Aplica o middleware CORS para permitir que o servidor aceite requisições de diferentes origens
app.use(cors());

// Sincroniza o banco de dados com os modelos definidos
db.sync()
  .then(() => {
    console.log("Banco de dados conectado e sincronizado com sucesso!"); // Se a conexão der certo
  })
  .catch((error) => {
    console.error("Erro ao conectar no banco de dados:", error); // Se a conexão falhar
  });

// Define o prefixo '/api/...' para as rotas de tarefas
app.use("/api/tarefas", tarefaRoutes);
app.use("/api/colunas", colunaRoutes);
app.use("/api/quadros", quadroRoutes);
app.use("/api/usuarios", usuarioRoutes); 
app.use("/api", authRoutes); // vai criar a rota /api/auth/login

// Exporta o app para ser utilizado em outro arquivo (por exemplo, no servidor principal)
export default app;
