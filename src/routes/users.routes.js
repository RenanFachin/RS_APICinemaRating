// importando do express o ROUTER
const { Router } = require("express");

// importando o UserControlller da pasta controllers
const UsersControlller = require("../controllers/UsersController");

// Inicializando a função ROUTER que veio do express e armazenando na constante usersRouters
const usersRoutes = Router();

// Instanciando
const usersController = new UsersControlller(); // Instanciando o UserController

// Importando o MIDDLEWARE de autenticação
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

// Método POST
usersRoutes.post("/", usersController.create);  // usersController tem a propriedade create que é a função criada

// método PUT para update do usuário

usersRoutes.put("/", ensureAuthenticated, usersController.update);
// qnd for acessada a rota, entrará o ensureAuthenticated para verificar e só depois (next) irá para o update

module.exports = usersRoutes;