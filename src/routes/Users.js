import express from "express";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const router = express.Router();

export const users = [];

router.post("/signup", async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome) {
    res.status(400).json({ error: "Por favor, verifique se passou o nome." });
  }
  if (!email) {
    res.status(400).json({ error: "Por favor, verifique se passou o email." });
  }
  if (!senha) {
    res.status(400).json({ error: "Por favor, verifique se passou a senha." });
  }

  const existeUsuario = users.find((user) => user.email === email);

  if (existeUsuario) {
    res.status(400).json({ erro: "Email já cadastrado, insira outro." });
  } else if (email && senha && nome) {
    const senhaCriptograda = await bcrypt.hash(senha, 10);

    const newUser = { id: uuidv4(), nome, email, senha: senhaCriptograda };

    users.push(newUser);
    return res
      .status(201)
      .json({ message: `Usuário ${nome} registrado com sucesso!` });
  }
});

router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  if (!email) {
    res.status(400).json({ error: "Por favor, verifique se passou o email." });
  }
  if (!senha) {
    res.status(400).json({ error: "Por favor, verifique se passou a senha." });
  }

  const existeUsuario = users.find((user) => user.email === email);
  if (!existeUsuario) {
    res.status(400).json({
      erro: "Email não encontrado no sistema, verifique ou crie uma conta",
    });
  } else {
    const senhaValida = await bcrypt.compare(senha, existeUsuario.senha);

    if (!senhaValida) {
      res.status(400).json({ error: "senha incorreta." });
    } else {
      res.status(200).json({
        message: `Seja bem vindo ${existeUsuario.nome}! Pessoa usuária logada com sucesso!`,
      });
    }
  }
});

export default router;
