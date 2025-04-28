import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("API de Tarefas com Express e Node.js");
});

export default app;
