import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import TarefasPage from "./pages/tarefaPage.js";
import LoginPage from "./pages/Login.js";
import QuadroPage from "./pages/QuadroPage.js";
import PrivateRoute from "./components/PrivateRoute.js";
import UsuarioPage from "./pages/UsuarioPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/quadros" element={<QuadroPage />} />
        <Route path="/usuario" element={<UsuarioPage />} />
        <Route
          path="/tarefas"
          element={
            <PrivateRoute>
              <TarefasPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
