// Importando a conexão com o banco de dado
const knex = require("../database/knex");

// Importando mensagem de erro
const AppError = require("../utils/AppError");

// Importando uma função do BCRYPT para fazer a comparação das senhas criptografadas
const { compare } = require("bcryptjs");


class SessionsController {
    async create (request, response){
        const { email, password } = request.body;
        
        // Utilizando o Knex para acessar a tabela de users e fazer um filtro de email
        const user = await knex("users").where({email}).first();

        // Fazendo a validação
        // Caso o usuário não exista
        if(!user){
            throw new AppError("E-mail e/ou senha incorreta", 401);
        }


        // Fazendo a comparação da senha digitada com a senha que consta no banco de dados
        // Como o user já foi fazer a conexão com o banco da dados, vamos utilizar ele para fazer a validação da senha e também, o método COMPARE do bcrypt
        const passwordMatched = await compare(password, user.password)

        if(!passwordMatched){
            throw new AppError("E-mail e/ou senha incorreta", 401);
        }

        return response.json(user);
    }
}


module.exports = SessionsController;