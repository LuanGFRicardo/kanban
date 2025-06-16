import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [mensagem, setMensagem] = useState({ tipo: "", texto: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", { email, senha });
      localStorage.setItem("token", res.data.acessToken);
      navigate("/quadros");
    } catch (error) {
      setMensagem({ tipo: "danger", texto: "Login inválido." });
    }
  };

  const handleCadastro = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/usuarios", { nome, email, senha });
      setMensagem({ tipo: "success", texto: "Usuário cadastrado com sucesso! Faça o login." });
    } catch (error) {
      setMensagem({ tipo: "danger", texto: "Erro ao cadastrar usuário." });
    }
  };

  return (
    <div className="container mt-5">
      {/* Alerta visível na tela */}
      {mensagem.texto && (
        <div className={`alert alert-${mensagem.tipo} alert-dismissible fade show`} role="alert">
          {mensagem.texto}
          <button type="button" className="btn-close" aria-label="Close" onClick={() => setMensagem({ tipo: "", texto: "" })}></button>
        </div>
      )}

      {/* Formulário de Login */}
      <form onSubmit={handleLogin} className="mb-5">
        <h2 className="mb-3">Login</h2>
        <div className="row g-2 align-items-end">
          <div className="col-md-4">
            <input type="email" className="form-control" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="col-md-4">
            <input type="password" className="form-control" placeholder="Senha" onChange={(e) => setSenha(e.target.value)} required />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary">Entrar</button>
          </div>
        </div>
      </form>

      {/* Formulário de Cadastro */}
      <form onSubmit={handleCadastro}>
        <h2 className="mb-3">Cadastro</h2>
        <div className="row g-2 align-items-end">
          <div className="col-md-4">
            <input type="text" className="form-control" placeholder="Nome completo" onChange={(e) => setNome(e.target.value)} required />
          </div>
          <div className="col-md-3">
            <input type="email" className="form-control" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="col-md-3">
            <input type="password" className="form-control" placeholder="Senha" onChange={(e) => setSenha(e.target.value)} required />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-success">Cadastrar</button>
          </div>
        </div>
      </form>
    </div>
  );
}
