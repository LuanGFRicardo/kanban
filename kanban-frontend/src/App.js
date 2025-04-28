// Importa o React
import React from "react";

// Importa o roteador do React Router
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Importa a página de tarefas
import TarefasPage from "./pages/tarefaPage.js";

// Componente principal que define as rotas da aplicação
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TarefasPage />} /> {/* Página inicial "/" renderiza TarefasPage */}
      </Routes>
    </Router>
  );
}

// Exporta o App
export default App;
