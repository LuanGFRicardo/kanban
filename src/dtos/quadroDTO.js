export class QuadroDto {
  constructor(quadro) {
    this.id = quadro.id;
    this.nome = quadro.nome;
    this.usuarioId = quadro.usuarioId;
    this.createdAt = quadro.createdAt;
    this.updatedAt = quadro.updatedAt;
  }

  static fromRequest(body) {
    return {
      nome: body.nome,
      usuarioId: body.usuarioId,
    };
  }
}
