import { useNavigate } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

function AppNavbar({ onVoltar }) {
  const navigate = useNavigate();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <div className="d-flex align-items-center gap-2">
          {onVoltar && (
            <ArrowLeft
              size={24}
              style={{ cursor: "pointer", color: "white" }}
              onClick={onVoltar}
            />
          )}
          <Navbar.Brand onClick={() => navigate("/quadros")} style={{ cursor: "pointer" }}>
            Kanban
          </Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="kanban-navbar" />
        <Navbar.Collapse id="kanban-navbar">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/usuario">Perfil</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
