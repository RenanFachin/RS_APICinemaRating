// importando a função que vai gerar a criptografia da senha
const { hash } = require("bcryptjs")

// Importando o AppError
const AppError = require("../utils/AppError");

// Importando a conexão com o banco de dados
const sqliteConnection = require("../database/sqlite");

// Camada que vai executar o que o usuário solicitou pela requisição

class UsersController {
    // Classe permite ter várias funções

    // Função "CREATE" para criar um usuário
    async create (request, response) {
        // obtendo as informações enviadas pela requisição
        const { name, email, password } = request.body;
        
        // fazendo a conexão com o banco de dados
        const database = await sqliteConnection();

        // Checando se o usuário já tem um email existente antes de fazer o cadastro
        const checkUserExist = await database.get("SELECT * FROM users WHERE email = (?)",
        [email]);
        if(checkUserExist){
            throw new AppError("Este e-mail já está em uso.");
        }

        const hashedPassword = await hash(password, 8);

        // Adicionando o usuário na tabela
        await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword]);

        return response.status(201).json();
    }


}


module.exports = UsersController;