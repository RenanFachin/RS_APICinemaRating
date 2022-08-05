// Importando o express (pasta node_modules)
const express = require("express");

// Iniciando o express
const app = express();


// IMPLEMENTANDO O MÉTODO GET para quando for solicitado no /teste da porta 3333
app.get("/teste/:id/:user", (request, response) => {
    const { id, user } = request.params // Desestruturação

    response.send(`
        Mensagem de ID: ${id},
        Para o usuário: ${user}.
    `)
})

// Query Params
app.get("/users", (request, response) => {
    const { page, limit } = request.query;

    response.send(`Página: ${page}. Mostrar ${limit}`);
});


// Criando uma porta para atender as solicitações
const PORT = 3333;

// Adicionando um listener nesta porta
app.listen(PORT, () =>
    console.log(`server is running on PORT ${PORT}`)
);