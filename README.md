
# 🧩 UniKanban

O **UniKanban** é um projeto desenvolvido por uma equipe de alunos universitários da **UniSenaiPR** como parte da disciplina de **Arquitetura de Software**. Durante as aulas, aplicamos conceitos teóricos e práticos ensinados pelo professor para desenvolver uma aplicação completa no estilo **Kanban**.

---

## 🚀 Tecnologias Utilizadas

### 🔧 Backend

- **Node.js** – Plataforma para executar código JavaScript no servidor.
- **Express.js** – Framework web minimalista para Node.js.
- **Sequelize** – ORM para modelar e interagir com o banco de dados.
- **SQLite** – Banco de dados leve e local, ideal para testes e protótipos.
- **CORS** – Middleware para permitir requisições entre diferentes origens.
- **Dotenv** – Gerenciador de variáveis de ambiente.

### 🎨 Frontend

- **React.js** – Biblioteca JavaScript para criação de interfaces.
- **React Router Dom** – Roteamento de páginas no React.
- **Axios** – Cliente HTTP para comunicação com o backend.
- **Bootstrap / React-Bootstrap** – Estilização e responsividade.
- **React Bootstrap Icons** – Ícones prontos para uso com Bootstrap no React.

---

## 📁 Estrutura de Pastas
---

### 📁 Backend (`/`)

```text
src/
├── config/
│   ├── dbConnect.js         // Conexão com o banco de dados
│   └── jsonSecret.js        // Segredo usado para geração de tokens JWT
├── controllers/
│   ├── authController.js        // Controle de autenticação (login)
│   ├── colunasController.js     // Controle das colunas
│   ├── quadrosController.js     // Controle dos quadros
│   ├── tarefasController.js     // Controle das tarefas
│   └── usuariosController.js    // Controle dos usuários
├── dtos/
│   ├── colunaDTO.js         // Data Transfer Object de Coluna
│   ├── quadroDTO.js         // DTO de Quadro
│   ├── tarefaDTO.js         // DTO de Tarefa
│   └── usuarioDTO.js        // DTO de Usuário
├── middleware/
│   └── authMiddleware.js    // Middleware de autenticação para proteger rotas
├── models/
│   ├── Coluna.js            // Modelo da tabela de colunas
│   ├── Quadro.js            // Modelo da tabela de quadros
│   ├── Tarefa.js            // Modelo da tabela de tarefas
│   ├── Usuario.js           // Modelo da tabela de usuários
│   └── index.js             // Associação entre os modelos
├── repositories/
│   ├── baseRepository.js        // Repositório base reutilizável
│   ├── colunaRepository.js      // Repositório para colunas
│   ├── quadroRepository.js      // Repositório para quadros
│   ├── tarefaRepository.js      // Repositório para tarefas
│   └── usuarioRepository.js     // Repositório para usuários
├── routes/
│   ├── authRoutes.js        // Rotas de autenticação
│   ├── colunasRoutes.js     // Rotas de colunas
│   ├── quadrosRoutes.js     // Rotas de quadros
│   ├── tarefaRoutes.js      // Rotas de tarefas
│   └── usuarioRoutes.js     // Rotas de usuários
├── services/
│   ├── authService.js       // Lógica de autenticação
│   ├── colunaService.js     // Lógica de negócio das colunas
│   ├── quadroService.js     // Lógica de negócio dos quadros
│   ├── tarefaService.js     // Lógica de negócio das tarefas
│   └── usuarioService.js    // Lógica de negócio dos usuários
├── app.js                   // Configuração principal da aplicação
└── server.js                // Inicialização do servidor

.gitignore                  // Arquivos e pastas ignorados pelo Git
database.sqlite             // Banco de dados SQLite
package.json               // Dependências e scripts do projeto
package-lock.json          // Versões exatas das dependências
```

---

### 📁 Frontend (`/kanban-frontend`)

```text
kanban-frontend/
├── public/
│   ├── favicon.ico         // Ícone da aba do navegador
│   ├── index.html          // HTML principal onde o React será montado
│   ├── logo192.png         // Logo padrão (usado em PWA)
│   ├── logo512.png         // Logo maior (PWA e instalação)
│   ├── manifest.json       // Configuração de Progressive Web App
│   └── robots.txt          // Instruções para indexação de robôs (SEO)
├── src/
│   ├── components/
│   │   ├── CardTarefa.js        // Componente visual de um card de tarefa
│   │   ├── ModalNovaTarefa.js  // Modal para criar uma nova tarefa
│   │   ├── ModalTarefa.js      // Modal para visualizar/editar tarefa
│   │   ├── Navbar.js           // Barra de navegação principal
│   │   └── PrivateRoute.js     // Componente que protege rotas privadas
│   ├── pages/
│   │   ├── Login.js            // Tela de login
│   │   ├── QuadroPage.js       // Página que exibe os quadros
│   │   ├── tarefaPage.js       // Página com tarefas organizadas por coluna
│   │   └── UsuarioPage.js      // Página de gerenciamento de usuários
│   ├── App.js              // Componente raiz com as rotas do app
│   └── index.js            // Ponto de entrada da aplicação React
├── .gitignore              // Arquivos/pastas ignorados pelo Git
├── package.json            // Dependências e scripts do projeto
└── package-lock.json       // Versões exatas das dependências
```

## 🗃️ Banco de Dados

### 📌 Tabela: **Tarefas**

| Coluna      | Tipo    | Restrições                          |
| ----------- | ------- | ----------------------------------- |
| `id`        | INTEGER | Primária, auto-incremento           |
| `titulo`    | STRING  | Obrigatório                         |
| `descricao` | STRING  | Obrigatório                         |
| `status`    | ENUM    | Obrigatório                         |
| `quadroId`  | INTEGER | Obrigatório (chave estrangeira)     |
| `colunaId`  | INTEGER | Obrigatório (chave estrangeira)     |
| `createdAt` | DATE    | Preenchido automaticamente          |
| `updatedAt` | DATE    | Atualizado automaticamente          |

### 📌 Tabela: **Colunas**

| Coluna      | Tipo    | Restrições                      |
| ----------- | ------- | ------------------------------- |
| `id`        | INTEGER | Primária, auto-incremento       |
| `nome`      | STRING  | Obrigatório                     |
| `ordem`     | INTEGER | Obrigatório                     |
| `quadroId`  | INTEGER | Obrigatório (chave estrangeira) |
| `createdAt` | DATE    | Preenchido automaticamente      |
| `updatedAt` | DATE    | Atualizado automaticamente      |

### 📌 Tabela: **Quadros**

| Coluna      | Tipo    | Restrições                      |
| ----------- | ------- | ------------------------------- |
| `id`        | INTEGER | Primária, auto-incremento       |
| `nome`      | STRING  | Obrigatório                     |
| `usuarioId` | INTEGER | Obrigatório (chave estrangeira) |
| `createdAt` | DATE    | Preenchido automaticamente      |
| `updatedAt` | DATE    | Atualizado automaticamente      |

### 📌 Tabela: **Usuários**

| Coluna      | Tipo    | Restrições                 |
| ----------- | ------- | -------------------------- |
| `id`        | INTEGER | Primária, auto-incremento  |
| `nome`      | STRING  | Obrigatório                |
| `email`     | STRING  | Obrigatório, único         |
| `senha`     | STRING  | Obrigatório                |
| `createdAt` | DATE    | Preenchido automaticamente |
| `updatedAt` | DATE    | Atualizado automaticamente |

---

## 🔗 Endpoints disponíveis

### 📌 Tarefas (`/api/tarefas`)

| Método | Rota                          | Descrição                   |
| ------ | ----------------------------- | --------------------------- |
| GET    | `/api/tarefas`                | Lista todas as tarefas      |
| POST   | `/api/tarefas`                | Cadastra uma nova tarefa    |
| GET    | `/api/tarefas/:id`            | Busca uma tarefa pelo ID    |
| PUT    | `/api/tarefas/:id`            | Atualiza uma tarefa pelo ID |
| DELETE | `/api/tarefas/:id`            | Deleta uma tarefa pelo ID   |
| GET    | `/api/tarefas/search/:titulo` | Busca tarefas por título    |

### 📌 Usuários (`/api/usuarios`)

| Método | Rota                         | Descrição                    |
| ------ | ---------------------------- | ---------------------------- |
| GET    | `/api/usuarios`              | Lista todos os usuários      |
| POST   | `/api/usuarios`              | Cadastra um novo usuário     |
| GET    | `/api/usuarios/:id`          | Busca um usuário pelo ID     |
| PUT    | `/api/usuarios/:id`          | Atualiza os dados do usuário |
| DELETE | `/api/usuarios/:id`          | Deleta um usuário            |
| GET    | `/api/usuarios/search/:nome` | Busca usuários por nome      |

### 📌 Quadros (`/api/quadros`)

| Método | Rota                        | Descrição                         |
| ------ | --------------------------- | --------------------------------- |
| GET    | `/api/quadros`              | Lista todos os quadros do usuário |
| POST   | `/api/quadros`              | Cria um novo quadro               |
| GET    | `/api/quadros/:id`          | Busca um quadro pelo ID           |
| PUT    | `/api/quadros/:id`          | Atualiza um quadro                |
| DELETE | `/api/quadros/:id`          | Deleta um quadro                  |

### 📌 Colunas (`/api/colunas`)

| Método | Rota                        | Descrição                |
| ------ | --------------------------- | ------------------------ |
| GET    | `/api/colunas`              | Lista todas as colunas   |
| POST   | `/api/colunas`              | Cria uma nova coluna     |
| GET    | `/api/colunas/:id`          | Busca uma coluna pelo ID |
| PUT    | `/api/colunas/:id`          | Atualiza uma coluna      |
| DELETE | `/api/colunas/:id`          | Deleta uma coluna        |
| GET    | `/api/colunas/search/:nome` | Busca colunas por nome   |

### 🔐 Autenticação

| Método | Rota              | Descrição                   |
| ------ | ----------------- | --------------------------- |
| POST   | `/api/auth/login` | Realiza login e retorna JWT |


## ⚙️ Instalação e execução

### 🔧 Backend

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
---

### 🎨 Frontend

> Execute após o backend já estar em funcionamento.

1. Acesse a pasta do frontend:

```bash
cd kanban-frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o frontend:

```bash
npm start
```
---


### 🔐 Autenticação

Este projeto utiliza autenticação baseada em **JWT (JSON Web Token)**. Após realizar o login com sucesso via `/api/auth/login`, o token retornado deve ser incluído nas requisições protegidas utilizando o cabeçalho:

```http
Authorization: Bearer SEU_TOKEN_AQUI
```

---

### 🎯 Funcionalidades Principais

* Cadastro e login de usuários
* Criação de quadros personalizados
* Organização de tarefas em colunas estilo Kanban
* Edição, exclusão e visualização de tarefas
* Navegação protegida com rotas privadas

---

### 👥 Equipe de Desenvolvimento

Desenvolvido por Alain Diego, Fernanda Amaral, Luan França, Naiara Daros e Jairo Nascimento.
