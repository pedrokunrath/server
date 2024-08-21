const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./database");

const server = express();

server.enable("trust proxy");
server.disable("x-powered-by");

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(helmet());
server.use(morgan("dev"));
server.use(cors());

server.get("/list", async (req, res) => {
  const selectAllUsersQuery = "SELECT * FROM users";

  try {
    const users = await new Promise((resolve, reject) => {
      db.all(selectAllUsersQuery, [], (error, rows) => {
        if (error) {
          reject(error);
        } else {
          resolve(rows);
        }
      });
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Erro ao listar os dados:", error.message);
    res.status(500).send("Erro ao listar os dados.");
  }
});

server.post("/create", async (req, res) => {
  const { name, email } = req.body;

  const insertUserQuery = `INSERT INTO users (name, email) VALUES (?, ?)`;

  try {
    await new Promise((resolve, reject) => {
      db.run(insertUserQuery, [name, email], (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });

    res.status(200).send("Dados salvos com sucesso!");
  } catch (error) {
    console.error("Erro ao salvar os dados:", error.message);
    res.status(500).send("Erro ao salvar os dados.");
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
