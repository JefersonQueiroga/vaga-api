const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const { create, update, findAll, remove } = require('./repositories/vagaRepository');

const app = express();
const port = 3000;

app.use(express.json());

// Configuração do Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Vagas',
            version: '1.0.0',
            description: 'API para gerenciar vagas de emprego',
        },
    },
    apis: ['./server.js'], // Caminho para as rotas e documentação Swagger
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * components:
 *   schemas:
 *     Vaga:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 123e4567-e89b-12d3-a456-426614174000
 *         descricao:
 *           type: string
 *           example: Desenvolvedor Backend
 *         titulo:
 *           type: string
 *           example: Programador Node.js
 *         dataCadastro:
 *           type: string
 *           format: date-time
 *           example: 2024-10-25T10:30:00Z
 *         telefone:
 *           type: string
 *           example: 11987654321
 *         empresa:
 *           type: string
 *           example: Global Solutions
 */

/**
 * @swagger
 * /vagas:
 *   post:
 *     summary: Cria uma nova vaga
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vaga'
 *     responses:
 *       201:
 *         description: Vaga criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vaga'
 */
app.post('/vagas', async (req, res) => {
    try {
        const vaga = await create(req.body);
        res.status(201).json(vaga);
    } catch (error) {
        console.error('Erro ao criar vaga:', error);
        res.status(400).json({ error: error.message });
    }
});

/**
 * @swagger
 * /vagas:
 *   get:
 *     summary: Retorna todas as vagas
 *     responses:
 *       200:
 *         description: Lista de vagas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vaga'
 */
app.get('/vagas', async (req, res) => {
    try {
        const vagas = await findAll();
        res.json(vagas);
    } catch (error) {
        console.error('Erro ao buscar vagas:', error);
        res.status(500).json({ error: 'Erro ao buscar vagas' });
    }
});

/**
 * @swagger
 * /vagas/{id}:
 *   put:
 *     summary: Atualiza uma vaga existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vaga'
 *     responses:
 *       200:
 *         description: Vaga atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vaga'
 *       404:
 *         description: Vaga não encontrada
 */
app.put('/vagas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const vaga = await update(id, req.body);
        if (!vaga) {
            return res.status(404).json({ error: 'Vaga não encontrada' });
        }
        res.json(vaga);
    } catch (error) {
        console.error('Erro ao atualizar vaga:', error);
        res.status(400).json({ error: error.message });
    }
});

/**
 * @swagger
 * /vagas/{id}:
 *   delete:
 *     summary: Remove uma vaga existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Vaga removida com sucesso
 *       404:
 *         description: Vaga não encontrada
 */
app.delete('/vagas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await remove(id);
        if (!deleted) {
            return res.status(404).json({ error: 'Vaga não encontrada' });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao remover vaga:', error);
        res.status(500).json({ error: 'Erro ao remover vaga' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
