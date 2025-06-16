import jwt from "jsonwebtoken";
import jsonSecret from "../config/jsonSecret.js";

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Verifica se o header está presente e no formato correto
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send("Token de acesso não foi informado.");
  }

  const [, token] = authHeader.split(" ");

  try {
    // Verifica e decodifica o token JWT
    const decoded = jwt.verify(token, jsonSecret.secret);

    // Anexa os dados do usuário no request (útil para rotas futuras, como /me)
    req.userId = decoded.id;
    req.userEmail = decoded.email;

    // Continua para o controller
    return next();
  } catch (error) {
    return res.status(401).send("Usuário não autorizado.");
  }
};
