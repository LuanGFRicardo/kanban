import Usuario from "../models/Usuario.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import jsonSecret from "../config/jsonSecret.js";

const { compare } = bcryptjs;

class AuthService {
  async login({ email, senha }) {
    try {
      const objUser = await Usuario.findOne({ where: { email } });

      if (!objUser) {
        throw new Error("Usuário não cadastrado.");
      }

      const passwordMatch = await compare(senha, objUser.senha); // <- Aqui!
      if (!passwordMatch) {
        throw new Error("Usuário ou senha inválido.");
      }

      const acessToken = jwt.sign(
        {
          id: objUser.id,
          email: objUser.email,
        },
        jsonSecret.secret,
        { expiresIn: 86400 } // 24 horas
      );

      return { acessToken };

    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default AuthService;
