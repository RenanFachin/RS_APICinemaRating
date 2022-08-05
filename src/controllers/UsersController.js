// Importando o AppError
const AppError = require("../utils/AppError");

// Camada que vai executar o que o usuário solicitou pela requisição

class UsersController {
    // Classe permite ter várias funções

    // Função "CREATE" para criar um usuário
    create (request, response) {
        // obtendo as informações enviadas pela requisição
        const { name, email, password } = request.body;
        
        // Verificando se o usuário não informou o name
        if(!name){
            throw new AppError("O nome é obrigatório");
            // new para instanciar. message = "o nome é obrigatório"
        }

        // devolvendo em forma de json as informações fornecidas pelo body da requisição
        response.status(201).json({ name, email, password });
    }


}


module.exports = UsersController;