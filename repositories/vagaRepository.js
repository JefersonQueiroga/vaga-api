const db = require('../database/databaseConfig');
const Vaga = require('../models/Vaga');

async function create(dados) {
    try {
        Vaga.validarDados(dados);
        const vaga = new Vaga(dados);

        const query = `
            INSERT INTO vagas (id, descricao, titulo, dataCadastro, telefone, empresa)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        await new Promise((resolve, reject) =>
            db.run(query, [vaga.id, vaga.descricao, vaga.titulo, vaga.dataCadastro, vaga.telefone, vaga.empresa], function (err) {
                if (err) reject(err);
                else resolve();
            })
        );

        return vaga.toJSON();
    } catch (error) {
        throw new Error(`Erro ao criar vaga: ${error.message}`);
    }
}

async function update(id, dados) {
    try {
        Vaga.validarDados(dados);

        const query = `
            UPDATE vagas
            SET descricao = ?, titulo = ?, dataCadastro = ?, telefone = ?, empresa = ?
            WHERE id = ?
        `;

        await new Promise((resolve, reject) =>
            db.run(query, [dados.descricao, dados.titulo, dados.dataCadastro, dados.telefone, dados.empresa, id], function (err) {
                if (err) reject(err);
                else resolve();
            })
        );

        return { id, ...dados };
    } catch (error) {
        throw new Error(`Erro ao atualizar vaga: ${error.message}`);
    }
}

async function findAll() {
    const query = `SELECT * FROM vagas`;
    return new Promise((resolve, reject) =>
        db.all(query, [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        })
    );
}

async function remove(id) {
    const query = `DELETE FROM vagas WHERE id = ?`;
    return new Promise((resolve, reject) =>
        db.run(query, [id], function (err) {
            if (err) reject(err);
            else resolve(this.changes > 0);
        })
    );
}

module.exports = { create, update, findAll, remove };
