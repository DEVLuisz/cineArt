const db = require('../DB/conexao');

async function updateCardId(usuario_id, cardId) {
  try {
    const atualizaUsuario = 'UPDATE usuarios SET card_id = $1 WHERE id = $2';
    await db.query(atualizaUsuario, [cardId, usuario_id]);
    console.log('Campo card_id atualizado com sucesso');
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = {
  updateCardId: updateCardId
};