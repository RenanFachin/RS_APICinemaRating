// Camada que vai executar o que o usuário solicitou pela requisição

class UsersController {
    // Classe permite ter várias funções

    // Função para criar um usuário
    create (request, response) {
        // obtendo as informações enviadas pela requisição
        const { name, email, password } = request.body;

        // devolvendo em forma de json as informações fornecidas pelo body da requisição
        response.json({ name, email, password });
    }
}


module.exports = UsersController;