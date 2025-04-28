// Importa o React
import React from "react";

// Importa o arquivo de estilos da navbar
import "../styles/Navbar.css";

// Componente que representa a barra de navegação no topo da página
function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">UniKanban</div> {/* Nome ou logo da aplicação */}
    </nav>
  );
}

// Exporta o componente para uso no topo da aplicação
export default Navbar;
