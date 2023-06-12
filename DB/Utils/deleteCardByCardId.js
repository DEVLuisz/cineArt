const db = require('../conexao');

async function deleteCardByCardId(cardId) {
  try {
    const result = await db.query(
      "DELETE FROM cartao WHERE id = $1",
      [cardId]
    );

    if (result.rowCount > 0) {
      return { success: true, message: "Cartão excluído com sucesso" };
    } else {
      return { success: false, message: "Nenhum cartão encontrado com o ID fornecido" };
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  deleteCardByCardId
};
