const { v4: uuidv4 } = require('uuid');

class Vaga {
    constructor({ descricao, titulo, dataCadastro, telefone, empresa }) {
        this.id = uuidv4();
        this.descricao = descricao;
        this.titulo = titulo;
        this.dataCadastro = dataCadastro || new Date().toISOString();
        this.telefone = telefone;
        this.empresa = empresa;
    }

    // Validação básica dos campos
    static validarDados({ descricao, titulo, telefone, empresa }) {
        if (!descricao || !titulo || !telefone || !empresa) {
            throw new Error('Todos os campos obrigatórios devem ser preenchidos.');
        }
    }

    // Método para converter uma vaga para objeto JSON
    toJSON() {
        return {
            id: this.id,
            descricao: this.descricao,
            titulo: this.titulo,
            dataCadastro: this.dataCadastro,
            telefone: this.telefone,
            empresa: this.empresa,
        };
    }
}

module.exports = Vaga;
