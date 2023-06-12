const db = require('./conexao');

function insertCartao(numero, nome_titular, validade_mes, validade_ano, cvv, usuario_id) {
  return new Promise((resolve, reject) => {
    const novoCartao =
      'INSERT INTO cartao (numero, nome_titular, validade_mes, validade_ano, cvv, usuario_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id';

    db.query(novoCartao, [
      numero,
      nome_titular,
      validade_mes,
      validade_ano,
      cvv,
      usuario_id
    ])
      .then(result => {
        const cartaoId = result.rows[0].id;
        console.log('Cartão inserido com sucesso');
        resolve(cartaoId);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
}

module.exports = {
  insertCartao: insertCartao
};