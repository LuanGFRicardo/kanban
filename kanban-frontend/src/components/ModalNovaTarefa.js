import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function ModalNovaTarefa({ show, onClose, onCreate }) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!show) {
      setTitulo("");
      setDescricao("");
      setStatus("");
    }
  }, [show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(titulo, descricao, status);
  };

  return (
    <Modal show={show} onHide={onClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Nova Tarefa</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
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

          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
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
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary">
            Criar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ModalNovaTarefa;
