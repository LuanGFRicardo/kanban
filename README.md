# 📋 Kanban API - V4 (SQLite)

Este projeto é a versão **V4** da **API REST** de gerenciamento de **usuários** e **tarefas** estilo Kanban, construída com **Node.js**, **Express**, **Sequelize** e **SQLite**.

---

## 📁 Estrutura de Pastas

```
src/
 ├── config/
 │    └── dbConnect.js           // Conexão com o banco de dados
 ├── controllers/
 │    ├── tarefasController.js   // Controle das tarefas
 │    └── usuariosController.js  // Controle dos usuários
 ├── models/
 │    ├── Tarefa.js               // Modelo da tabela de tarefas
 │    └── Usuario.js              // Modelo da tabela de usuários
 ├── routes/
 │    ├── tarefaRoutes.js         // Rotas das tarefas
 │    └── usuarioRoutes.js        // Rotas dos usuários
 └── app.js                       // Configuração principal da aplicação
database.sqlite                   // Banco de dados SQLite
server.js                         // Inicialização do servidor
```

---

## 🚀 Tecnologias utilizadas

- **Node.js**
- **Express**
- **Sequelize**
- **SQLite**
- **Dotenv**

---

## ⚙️ Instalação e execução

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/kanban-v4-sqlite.git
```

2. Instale as dependências:

```bash
npm install
```

3. (Opcional) Configure seu arquivo `.env` se necessário.

4. Execute o servidor:

```bash
npm start
```
ou
```bash
node server.js
```

5. A aplicação estará disponível na porta **3000**.

---

## 📚 Endpoints disponíveis

### 🔹 Tarefas (`/api/tarefas`)

| Método | Rota               | Descrição                         |
|--------|---------------------|-----------------------------------|
| GET    | `/api/tarefas`       | Lista todas as tarefas            |
| POST   | `/api/tarefas`       | Cadastra uma nova tarefa          |
| GET    | `/api/tarefas/:id`    | Busca uma tarefa pelo ID          |
| PUT    | `/api/tarefas/:id`    | Atualiza uma tarefa pelo ID       |
| DELETE | `/api/tarefas/:id`    | Deleta uma tarefa pelo ID         |

### 🔹 Usuários (`/api/usuarios`)

| Método | Rota               | Descrição                         |
|--------|---------------------|-----------------------------------|
| GET    | `/api/usuarios`      | Lista todos os usuários           |
| POST   | `/api/usuarios`      | Cadastra um novo usuário          |

---

## 🛠️ Modelagem das Tabelas

### 📌 Tabela: `Tarefas`

| Coluna     | Tipo    | Restrições                         |
|------------|---------|------------------------------------|
| id         | INTEGER | Primária, auto-incremento          |
| titulo     | STRING  | Obrigatório                        |
| descricao  | STRING  | Obrigatório                        |
| status     | ENUM    | Aguardando, Em Andamento, Concluída |
| quadroId   | INTEGER | Obrigatório                        |
| createdAt  | DATE    | Gerado automaticamente             |
| updatedAt  | DATE    | Gerado automaticamente             |

### 📌 Tabela: `Usuarios`

| Coluna     | Tipo    | Restrições           |
|------------|---------|----------------------|
| id         | INTEGER | Primária, auto-incremento |
| nome       | STRING  | Obrigatório           |
| email      | STRING  | Obrigatório, Único    |
| senha      | STRING  | Obrigatório           |
| createdAt  | DATE    | Gerado automaticamente |
| updatedAt  | DATE    | Gerado automaticamente |

---

## 🔥 Exemplos de Teste

Você pode testar a API usando ferramentas como **Postman** ou **Insomnia**.

### 📋 Criar usuário (POST `/api/usuarios`)

```json
{
  "nome": "João da Silva",
  "email": "joao@example.com",
  "senha": "123456"
}
```

### 📋 Criar tarefa (POST `/api/tarefas`)

```json
{
  "titulo": "Estudar Node.js",
  "descricao": "Ler sobre Express e Sequelize",
  "status": "Aguardando",
  "quadroId": 1
}
```
