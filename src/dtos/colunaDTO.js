export class ColunaDto {
  constructor(coluna) {
    this.id = coluna.id;
    this.nome = coluna.nome;
    this.ordem = coluna.ordem;
    this.quadroId = coluna.quadroId;
    this.createdAt = coluna.createdAt;
    this.updatedAt = coluna.updatedAt;
  }

  static fromRequest(body) {
    return {
      nome: body.nome,
      ordem: body.ordem,
      quadroId: body.quadroId,
    };
  }
}
