const { Router } = require("express");

const NotesController = require("../controllers/NotesController");

const notesRoutes = Router();

// Importando o MIDDLEWARE de autenticação
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const notesController = new NotesController();

notesRoutes.use(ensureAuthenticated); // aplicado o middleware para todas as rotas

notesRoutes.get("/", notesController.index);
notesRoutes.post("/", notesController.create);
notesRoutes.get("/:id", notesController.show);
notesRoutes.delete("/:id", notesController.delete);


module.exports = notesRoutes;