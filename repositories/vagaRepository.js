const {v4: uuidv4} = require('uuid');
const logger = require('../utils/logger');

let vagas = [];

function create({descricao, titulo, dataCadastro,telefone, empresa}) {  
  try {
    const vaga = {
        id: uuidv4(),
        descricao,
        titulo,
        dataCadastro,
        telefone,
        empresa
    };
    vagas.push(vaga);
    return vaga;
  } catch (error) {
    logger.error('Erro ao criar vaga');
    logger.log(error)
    return null;
  }
}

function update(id, {descricao, titulo, dataCadastro,telefone, empresa}) {
    const index = vagas.findIndex(vaga => vaga.id === id);
    if (index === -1) {
        return null;
    }
    vagas[index] = {
        id,
        descricao,
        titulo,
        dataCadastro,
        telefone,
        empresa
    };
    return vagas[index];
}

function remove(id) {
    const index = vagas.findIndex(vaga => vaga.id === id);
    if (index === -1) {
        return false;
    }
    vagas.splice(index, 1);
    return true;
}

function findAll() {
    return vagas;
}

module.exports = {
    create,
    update,
    remove,
    findAll
}