// Importando o express (pasta node_modules)
const express = require("express");

// Iniciando o express
const app = express();

// Criando uma porta para atender as solicitações
const PORT = 3333;

// Adicionando um listener nesta porta
app.listen(PORT, () =>
    console.log(`server is running on PORT ${PORT}`)
);