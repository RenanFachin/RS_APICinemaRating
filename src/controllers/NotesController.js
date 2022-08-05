const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class NotesController {

    async create (request, response){
        const { title, description, rating, tags } = request.body;
        const { user_id } = request.params;

        if(rating < 1 || rating > 5 || rating % 1 !== 0)
        {
            throw new AppError ("Erro! Inserir um número inteiro maior que 1 e menor que 5")
        }
        else{

        const note_id = await knex ("notes").insert({
            title,
            description,
            user_id,
            rating
        });

        const tagsInsert = tags.map(name => {
            return {
                note_id,
                name,
                user_id 
            }
        });

        await knex("tags").insert(tagsInsert);

        response.json();

    }
}

    async show (request, response){
        const { id } = request.params;

        const notes = await knex("notes").where({ id }).first();
        const tags = await knex("tags").where({ note_id: id}).orderBy("name");

        return response.json({
            ...notes,
            tags
        })
    }

    async delete (request, response){
        const { id } = request.params;

        await knex("notes").where({ id }).delete();

        return response.json();
    }

    async index(request, response){
        const { title, user_id, tags } = request.query;

        let notes;

        if(tags){
            // transformando o texto passado como request query em um vetor
            const filterTags = tags.split(',').map(tag => tag.trim());
            
            notes = await knex("tags")
            .select([
                "notes.id",
                "notes.title",
                "notes.user_id"
            ])
            .where("notes.user_id", user_id)
            .whereLike("notes.title", `%${title}%`)
            .whereIn("name", filterTags)
            .innerJoin("notes", "notes.id", "tags.note_id") // conectando as tabelas usando a id da nota como item igual
            .orderBy("notes.title")
        }
        else{
            notes = await knex("notes")
            .where({ user_id })
            .whereLike("title", `%${title}%`)
            .orderBy("title");
        }

        const userTags = await knex("tags").where({ user_id });
        const noteWithTags = notes.map(note => {
            const noteTags = userTags.filter(tag=> tag.note_id === note.id);

            return{
                ...note,
                tags: noteTags
            }
        });

        return response.json(noteWithTags);
    }

}


module.exports = NotesController;