import express from "express";
import { v4 as uuidv4 } from "uuid";
import { users } from "./Users";

const router = express.Router();

export const messages = [];

router.post("/message", (req, res) => {
  const { email, title, description } = req.body;

  if (!email || !title || !description) {
    res.status(400).json({ error: "Preencha os campos corretamente." });
  } else {
    const existeEmail = users.find((user) => user.email === email);

    if (!existeEmail) {
      res
        .status(404)
        .json({ error: "Email não encontrado, verifique ou crie uma conta" });
    } else {
      const newMessage = {
        id: uuidv4(),
        title,
        description,
        email,
      };

      messages.push(newMessage);
      res
        .status(201)
        .json({ message: `Mensagem criada com sucesso! ${newMessage.title}` });
    }
  }
});

router.get("/message/:email", (req, res) => {
  const { email } = req.params;

  const existeUsuario = users.find((user) => user.email === email);

  if (!existeUsuario) {
    res
      .status(404)
      .json({ erro: "Email não encontrado, verifique ou crie uma conta" });
  } else {
    const recadosFiltrados = messages.filter(
      (message) => message.email == email
    );
    res.status(200).json({
      message: `Seja bem vindo! ${messages
        .map(
          (message) =>
            `ID: ${message.id}, Titulo: ${message.title}, Descrição: ${message.description}`
        )
        .join(" | ")}`,
      recadosFiltrados,
    });
  }
});

router.put("/message/:id", (req, res) => {
  const { title, description, email } = req.body;
  const { id } = req.params;

  const existeUsuario = users.find((user) => user.email === email);

  if (!existeUsuario) {
    res
      .status(404)
      .json({ erro: "Email não encontrado, verifique ou crie uma conta" });
  } else {
    const existeMessage = messages.find((message) => message.id === id);
    if (!existeMessage) {
      res.status(400).json({
        erro: "Mensagem não encontrada, verifique o identificado em nosso banco.",
      });
    } else {
      const messageID = messages.findIndex((message) => message.id === id);

      messages[messageID].title = title;
      messages[messageID].description = description;

      res.status(200).json({
        message: `Mensagem atualizada com sucesso! Titulo: ${messages[messageID].title} | Descrição: ${messages[messageID].description}`,
      });
    }
  }
});

router.delete("/message/:id", (req, res) => {
  const { id } = req.params;

  const existeMessage = messages.find((message) => message.id === id);

  const messageID = messages.findIndex((message) => message.id === id);

  if (!existeMessage) {
    res.status(400).json({
      erro: "Mensagem não encontrada, verifique o identificado em nosso banco.",
    });
  } else {
    messages.splice(messageID, 1);
    res.status(200).json({ message: "Mensagem apagada com sucesso." });
  }
});

export default router;
