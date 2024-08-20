const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("database.db", (error) => {
  if (error) {
    console.error("Erro ao abrir o banco de dados:", error.message);
  } else {
    console.log("Conectado ao banco de dados SQLite.");
  }
});

const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    name TEXT,
    email TEXT
  )
`;

db.run(createUsersTable, (error) => {
  if (error) {
    console.error("Erro ao criar a tabela:", error.message);
  } else {
    console.log('Tabela "users" criada ou já existe.');
  }
});

process.on("SIGINT", () => {
  db.close((error) => {
    if (error) {
      console.error("Erro ao fechar o banco de dados:", error.message);
    } else {
      console.log("Conexão com o banco de dados SQLite fechada.");
    }
    process.exit(0);
  });
});

module.exports = db;
