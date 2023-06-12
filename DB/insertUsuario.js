const db = require('./conexao');
const { updateCardId } = require('../Update/updateCardData');

exports.insertUsuario = function(nome, sobrenome, email, cpf, senha, endereco, telefone, data_nascimento, nome_usuario, cardId) {
    async function insereDados(nome, sobrenome, email, cpf, senha, endereco, telefone, data_nascimento, nome_usuario, cardId) {
        let userId;

        try {
            const novoUsuario = 'INSERT INTO usuarios (nome, sobrenome, email, cpf, senha, endereco, telefone, data_nascimento, nome_usuario) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id';
            const result = await db.query(novoUsuario, [nome, sobrenome, email, cpf, senha, endereco, telefone, data_nascimento, nome_usuario]);

            userId = result.rows[0].id;
            console.log('Usuário inserido com sucesso');

            if (cardId) {
                // Se cardId for fornecido, atualize o campo card_id
                await updateCardId(userId, cardId);
                console.log('Campo card_id atualizado com sucesso');
            }
        } catch (err) {
            console.error(err);
        } finally {
            //await db.end()
        }
    }

    return insereDados(nome, sobrenome, email, cpf, senha, endereco, telefone, data_nascimento, nome_usuario, cardId);
}
