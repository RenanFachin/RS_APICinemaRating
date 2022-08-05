// Importando
const database = require("./database/sqlite");

// Importando a biblioteca do express async errors
require("express-async-errors");
// Importando o APP ERROR
const AppError = require("./utils/AppError")

// Importando o express e armazenando na constante express
const express = require("express");
// Importando do index.js de routes a função routes que é executada quando algo é enviado pelo /users
const routes = require("./routes");
// Criando a constante app para chamar a express que foi importada
const app = express();

app.use(express.json());
app.use(routes);

database();

app.use( ( error, request, response, next ) => {
    // sabendo de onde vem o erro, se for do lado do cliente
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }
    
    console.error(error);

    // caso seja um erro do lado do servidor
    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    });
})

const PORT = 3333;

app.listen(PORT, () =>
    console.log(`server is running on PORT ${PORT}`)
);