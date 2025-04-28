// Importa o framework Express para criar o servidor
import express from "express";

// Importa a configuração de conexão com o banco de dados
import db from "./config/dbConnect.js";

// Importa o pacote dotenv para gerenciar variáveis de ambiente (.env)
import dotenv from "dotenv";

// Importa o arquivo de rotas de tarefas
import tarefaRoutes from "./routes/tarefaRoutes.js";

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Cria uma instância do Express
const app = express();

// Configura o servidor para aceitar requisições com JSON no corpo
app.use(express.json());

// Sincroniza o banco de dados com os modelos definidos
db.sync()
  .then(() => {
    console.log("Banco de dados conectado e sincronizado com sucesso!"); // Se a conexão der certo
  })
  .catch((error) => {
    console.error("Erro ao conectar no banco de dados:", error); // Se a conexão falhar
  });

// Define o prefixo '/api/tarefas' para as rotas de tarefas
app.use("/api/tarefas", tarefaRoutes);

// Exporta o app para ser utilizado em outro arquivo (por exemplo, no servidor principal)
export default app;
