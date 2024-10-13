import express from "express";
import cors from "cors";

const port = process.env.PORT || 3000;

import Welcome from "./routes/Welcome";
import Users from "./routes/Users";
import Notes from "./routes/Notes";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/", Welcome);
app.use("/", Users);
app.use("/", Notes);

app.listen(port, () => console.log(`Servidor iniciado na porta ${port}`));
