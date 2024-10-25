const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Define o caminho do banco de dados na raiz do projeto
const dbPath = path.resolve(__dirname, '..', 'database.db');

// Inicializa a conexão com o banco de dados
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }
});

// Cria a tabela de vagas, se não existir
db.run(`
  CREATE TABLE IF NOT EXISTS vagas (
    id TEXT PRIMARY KEY,
    descricao TEXT,
    titulo TEXT,
    dataCadastro TEXT,
    telefone TEXT,
    empresa TEXT
  )
`);

module.exports = db;
