# 📋 UniKanban - Versão 5

Este projeto é a versão **V5** do **UniKanban**, um sistema Kanban completo com **Backend** (Node.js + Express + Sequelize + SQLite) e **Frontend** (React.js), incluindo estilização separada por componente usando **CSS modularizado**.

---

## 📁 Estrutura de Pastas

### Backend (`/`)

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
 │    ├── tarefaRoutes.js         // Rotas de tarefas
 │    └── usuarioRoutes.js        // Rotas de usuários
 └── app.js                       // Configuração principal da aplicação
database.sqlite                   // Banco de dados SQLite
server.js                         // Inicialização do servidor
```

### Frontend (`/src`)

```
src/
 ├── components/
 │    ├── CardTarefa.js
 │    ├── Column.js
 │    ├── ModalNovaTarefa.js
 │    ├── ModalTarefa.js
 │    └── Navbar.js
 ├── pages/
 │    └── tarefaPage.js
 ├── styles/
 │    ├── CardTarefa.css
 │    ├── Column.css
 │    ├── ModalNovaTarefa.css
 │    ├── ModalTarefa.css
 │    ├── Navbar.css
 │    ├── tarefaPage.css
 │    └── index.css
 ├── App.js
 └── index.js
```

---

## 🚀 Tecnologias utilizadas

### Backend
- **Node.js**
- **Express**
- **Sequelize**
- **SQLite**
- **CORS**
- **Dotenv**

### Frontend
- **React.js**
- **React Router Dom**
- **Axios**
- **CSS modularizado** (um arquivo de estilo para cada componente)

---

## ⚙️ Instalação e execução

### Backend

1. Instale as dependências:

```bash
npm install
```

2. Execute o servidor:

```bash
npm start
```
ou
```bash
node server.js
```

O Backend estará rodando na porta **3000**.

---

### Frontend

1. Instale as dependências do React:

```bash
npm install
```

2. Execute o Frontend:

```bash
npm start
```

O Frontend estará rodando na porta **3000** (pode ser necessário mudar se o Backend já estiver usando).

---

## 📚 Endpoints disponíveis

### Tarefas (`/api/tarefas`)

| Método | Rota               | Descrição                         |
|--------|---------------------|-----------------------------------|
| GET    | `/api/tarefas`       | Lista todas as tarefas            |
| POST   | `/api/tarefas`       | Cadastra uma nova tarefa          |
| GET    | `/api/tarefas/:id`    | Busca uma tarefa pelo ID          |
| PUT    | `/api/tarefas/:id`    | Atualiza uma tarefa pelo ID       |
| DELETE | `/api/tarefas/:id`    | Deleta uma tarefa pelo ID         |

### Usuários (`/api/usuarios`)

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
| createdAt  | DATE    | Automático                         |
| updatedAt  | DATE    | Automático                         |

### 📌 Tabela: `Usuarios`

| Coluna     | Tipo    | Restrições           |
|------------|---------|----------------------|
| id         | INTEGER | Primária, auto-incremento |
| nome       | STRING  | Obrigatório           |
| email      | STRING  | Obrigatório, Único    |
| senha      | STRING  | Obrigatório           |
| createdAt  | DATE    | Automático             |
| updatedAt  | DATE    | Automático             |

---

## 🖌️ Estilização

Cada componente possui seu próprio arquivo de CSS, localizado em `/styles`:

- `CardTarefa.css`
- `Column.css`
- `ModalNovaTarefa.css`
- `ModalTarefa.css`
- `Navbar.css`
- `tarefaPage.css`
- `index.css` (estilos globais)

---

## 🖥️ Tela inicial

- Página `/` mostra o quadro Kanban dividido em:
  - **Aguardando**
  - **Em Andamento**
  - **Concluída**
- Botão para adicionar nova tarefa
- Modal para editar ou excluir tarefas
- Navbar com o título "UniKanban"

---

## 🔥 Exemplos de Teste

### Criar novo usuário (POST `/api/usuarios`)

```json
{
  "nome": "Ana Souza",
  "email": "ana@example.com",
  "senha": "123456"
}
```

### Criar nova tarefa (POST `/api/tarefas`)

```json
{
  "titulo": "Implementar autenticação",
  "descricao": "Usar JWT para proteger rotas",
  "status": "Aguardando",
  "quadroId": 1
}
```
