import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import AppNavbar from "../components/Navbar";

function UsuarioPage() {
  const [usuario, setUsuario] = useState(null);
  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState({ nome: "", email: "" });
  const [senha, setSenha] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        const decoded = jwtDecode(token);
        const usuarioId = decoded.id;

        const res = await axios.get(`http://localhost:3000/api/usuarios/${usuarioId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsuario(res.data);
        setFormData({ nome: res.data.nome, email: res.data.email });
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error.response?.data || error.message);
      }
    };

    if (token) buscarUsuario();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSalvar = async () => {
    try {
      const decoded = jwtDecode(token);
      const usuarioId = decoded.id;

      await axios.put(
        `http://localhost:3000/api/usuarios/${usuarioId}`,
        {
          ...formData,
          senha: senha !== "" ? senha : undefined,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUsuario({ ...usuario, ...formData });
      setEditando(false);
      setSenha("");
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error.response?.data || error.message);
    }
  };

  if (!usuario) return <p>Carregando informações do usuário...</p>;

  return (
    <>
      <AppNavbar onVoltar={() => navigate("/quadros")} />

      <div className="container mt-4">
        <h2 className="mb-4">Perfil do Usuário</h2>

        {editando ? (
          <>
            <div className="mb-3">
              <label className="form-label"><strong>Nome:</strong></label>
              <input
                type="text"
                name="nome"
                className="form-control"
                value={formData.nome}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label"><strong>Email:</strong></label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label"><strong>Nova senha:</strong></label>
              <input
                type="password"
                className="form-control"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            <button className="btn btn-success me-2" onClick={handleSalvar}>Salvar</button>
            <button className="btn btn-secondary" onClick={() => setEditando(false)}>Cancelar</button>
          </>
        ) : (
          <>
            <p><strong>Nome:</strong> {usuario.nome}</p>
            <p><strong>Email:</strong> {usuario.email}</p>
            <button className="btn btn-primary" onClick={() => setEditando(true)}>Editar</button>
          </>
        )}
      </div>
    </>
  );
}

export default UsuarioPage;
