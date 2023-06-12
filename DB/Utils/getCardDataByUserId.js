const db = require('../conexao');

async function getCardDataByUserId(userId) {
  try {
    const result = await db.query(
      "SELECT * FROM cartao WHERE usuario_id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      return null;
    }

    const cardData = result.rows[0];

    return {
      numero: cardData.numero,
      nome_titular: cardData.nome_titular,
      validade_mes: cardData.validade_mes,
      validade_ano: cardData.validade_ano,
      cvv: cardData.cvv
    };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getCardDataByUserId
};