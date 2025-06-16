export class UsuarioDto {
  constructor(usuario) {
    this.id = usuario.id;
    this.nome = usuario.nome;
    this.email = usuario.email;
    this.senha = usuario.senha;
    this.createdAt = usuario.createdAt;
    this.updatedAt = usuario.updatedAt;
  }

  static fromRequest(body) {
    return {
      nome: body.nome,
      email: body.email,
      senha: body.senha,
    };
  }
}
