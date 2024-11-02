const express = require('express');
const { create,update,remove,findAll } = require('./repositories/vagaRepository');
const morgan = require('morgan');
const logger = require('./utils/logger');

const app = express();
const port = 3000;

app.use(express.json());

app.use(
  morgan("combined", {
    stream: { write: (message) => logger.info(message.trim()) },
  })
);

app.post('/vagas', (req, res) => {
    const { descricao, titulo, dataCadastro, telefone, empresa } = req.body;
    const vaga = create({ descricao, titulo, dataCadastro, telefone, empresa });
    res.status(201).json(vaga);
});

app.get('/vagas', (req, res) => {
    const vagas = findAll();
    res.json(vagas);
});

app.put('/vagas/:id', (req, res) => {
    const { id } = req.params;
    const { descricao, titulo, dataCadastro, telefone, empresa } = req.body;
    const vaga = update(id, { descricao, titulo, dataCadastro, telefone, empresa });
    res.json(vaga);
});

app.delete('/vagas/:id', (req, res) => {
    const { id } = req.params;
    remove(id);
    res.status(204).send();
});

app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
});