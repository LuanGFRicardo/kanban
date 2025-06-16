import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function ModalTarefa({ tarefa, onClose, onSave, onDelete }) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (tarefa) {
      setTitulo(tarefa.titulo);
      setDescricao(tarefa.descricao);
      setStatus(tarefa.status || "");
    }
  }, [tarefa]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(tarefa.id, titulo, descricao, status);
  };

  return (
    <Modal show={!!tarefa} onHide={onClose} backdrop="static" centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Sobre</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Título da Tarefa"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="">Selecione o status</option>
              <option value="Aguardando">Aguardando</option>
              <option value="Em Andamento">Em Andamento</option>
              <option value="Concluído">Concluído</option>
              <option value="Cancelada">Cancelada</option>
              <option value="Paralisada">Paralisada</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={() => onDelete(tarefa.id)}>
            Deletar
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary">
            Salvar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ModalTarefa;
