const db = require('./conexao')

exports.insertUsuario = function(nome, sobrenome, email, cpf, senha, endereco, telefone, data_nascimento, nome_usuario) {
    async function insereDados(nome, sobrenome, email, cpf, senha, endereco, telefone, data_nascimento, nome_usuario) {
        try {
            //await db.connect()
            const novoUsuario = 'INSERT INTO usuarios (nome, sobrenome, email, cpf, senha, endereco, telefone, data_nascimento, nome_usuario) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)'
            await db.query(novoUsuario, [nome, sobrenome, email, cpf, senha, endereco, telefone, data_nascimento, nome_usuario])
        } catch (err) {
            console.error(err)
        } finally {
            //await db.end()
        }
    }
    return insereDados(nome, sobrenome, email, cpf, senha, endereco, telefone, data_nascimento, nome_usuario)
}
