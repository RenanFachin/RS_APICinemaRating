// importando do express o ROUTER
const { Router } = require("express");

// importando a função POST do usersRouter
const usersRouter = require("./users.routes");

// Inicializando a função ROUTER que veio do express e armazenando na constante routes
const routes = Router();

// Quando for requisitado algo na rota /users, será chamada a função usersRouter que está sendo importada da users.routes.js
routes.use("/users", usersRouter);


// Exportando a routes
module.exports = routes;
