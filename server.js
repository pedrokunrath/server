const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const db = new sqlite3.Database('database.db');

// Configuração do middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/')));

// Criação da tabela no banco de dados se não existir
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, email TEXT)");
});

// Rota para processar o envio dos dados
app.post('/submit', (req, res) => {
    const { name, email } = req.body;

    const stmt = db.prepare("INSERT INTO users (name, email) VALUES (?, ?)");
    stmt.run(name, email, (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Erro ao salvar os dados.');
        } else {
            res.status(200).send('Dados salvos com sucesso!');
        }
    });
    stmt.finalize();
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
