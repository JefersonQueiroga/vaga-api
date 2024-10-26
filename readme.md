
# **Vaga API**

API desenvolvida em **Express.js** para gerenciar vagas de emprego. A API permite criar, listar, atualizar e remover vagas, com documentação automatizada usando Swagger.

## 📋 **Tecnologias Utilizadas**
- **Node.js** com **Express.js**
- **SQLite** para armazenamento de dados
- **Swagger** para documentação
- **Nodemon** para reinicialização automática durante o desenvolvimento
- **UUIDv4** para geração de IDs únicos

## 📂 **Estrutura do Projeto**
- **server.js**: Arquivo principal com as rotas e configuração da API.
- **/repositories/vagaRepository.js**: Contém a lógica de persistência das vagas.
- **/api-docs**: Interface da documentação gerada automaticamente.

## 🚀 **Como Rodar o Projeto**
1. Clone o repositório:
   ```bash
   git clone <seu-repositório>
   cd vaga-api
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor com **Nodemon**:
   ```bash
   npm start
   ```

4. Acesse a API em: [http://localhost:3000](http://localhost:3000)  
   Acesse a documentação Swagger: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## 📌 **Endpoints**
### **Criar Vaga**
`POST /vagas`  
Cria uma nova vaga de emprego.

**Corpo da Requisição:**
```json
{
  "descricao": "Desenvolvedor Backend",
  "titulo": "Programador Node.js",
  "dataCadastro": "2024-10-25T10:30:00Z",
  "telefone": "11987654321",
  "empresa": "Global Solutions"
}
```

---

### **Listar Vagas**
`GET /vagas`  
Retorna todas as vagas cadastradas.

---

### **Atualizar Vaga**
`PUT /vagas/:id`  
Atualiza uma vaga existente.

**Corpo da Requisição:**
```json
{
  "descricao": "Desenvolvedor Full Stack",
  "titulo": "Programador Node.js",
  "telefone": "11999999999",
  "empresa": "Global Solutions"
}
```

---

### **Deletar Vaga**
`DELETE /vagas/:id`  
Remove uma vaga pelo ID.

---

## 🛠️ **Dependências do Projeto**
```json
"dependencies": {
  "express": "^4.19.2",
  "nodemon": "^3.1.4",
  "sqlite3": "^5.1.7",
  "swagger-jsdoc": "^6.2.8",
  "swagger-ui-express": "^5.0.1",
  "uuidv4": "^6.2.13"
}
```

---

## 📖 **Documentação**
A documentação da API é gerada pelo Swagger e pode ser acessada em:  
[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## 👨‍💻 **Autor**
Desenvolvido por **Jeferson Queiroga**.

---

