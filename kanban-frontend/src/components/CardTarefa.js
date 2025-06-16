function CardTarefa({ id, titulo, descricao, status, onClick }) {
  return (
    <div
      className="bg-white text-dark rounded p-2 mb-2 shadow-sm"
      style={{ cursor: "pointer" }}
      onClick={onClick}
    >
      <div className="fw-semibold mb-1">{titulo}</div>
      <div className="text-muted small mb-1">{descricao}</div>
      <span className="badge bg-primary">{status}</span>
    </div>
  );
}

export default CardTarefa;
