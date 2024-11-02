const pino = require("pino"); //Importamos a biblioteca pino

//Criamos uma instância do pino, passando um objeto de configuração
const logger = pino({
  level: process.env.NODE_ENV === "production" ? "info" : "debug", //Definimos o nível de log, dependendo do ambiente (produção ou desenvolvimento)
  transport:
    process.env.NODE_ENV !== "production" //Se não estivermos em produção, definimos o transporte para pino-pretty
      ? {
          target: "pino-pretty", //Definimos o transporte para pino-pretty, que formata o log de forma mais legível
          options: { colorize: true },
        }
      : undefined,
});

module.exports = logger;
