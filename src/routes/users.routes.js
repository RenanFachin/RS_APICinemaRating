const { Router } = require("express");

const usersRoutes = Router();

// Método POST
usersRoutes.post("/", (request, response) => {
    const { name, email, password } = request.body;

    response.json({ name, email, password });
});

module.exports = usersRoutes;