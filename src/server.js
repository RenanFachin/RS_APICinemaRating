// Importando o express e armazenando na constante express
const express = require("express");
// Importando do index.js de routes a função routes que é executada quando algo é enviado pelo /users
const routes = require("./routes");
// Criando a constante app para chamar a express que foi importada
const app = express();

app.use(express.json());
app.use(routes);

const PORT = 3333;

app.listen(PORT, () =>
    console.log(`server is running on PORT ${PORT}`)
);