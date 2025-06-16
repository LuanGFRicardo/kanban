export class TarefaDto {
  constructor(tarefa) {
    this.id = tarefa.id;
    this.titulo = tarefa.titulo;
    this.descricao = tarefa.descricao;
    this.status = tarefa.status;
    this.colunaId = tarefa.colunaId;
    this.quadroId = tarefa.quadroId;
    this.createdAt = tarefa.createdAt;
    this.updatedAt = tarefa.updatedAt;
  }

  static fromRequest(body) {
    return {
      titulo: body.titulo,
      descricao: body.descricao,
      status: body.status,
      colunaId: body.colunaId,
      quadroId: body.quadroId,
    };
  }
}
