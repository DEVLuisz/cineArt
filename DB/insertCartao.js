const db = require('./conexao');

function insertCartao(numero, nome_titular, validade_mes, validade_ano, cvv) {
  async function insereDadosCartao(numero, nome_titular, validade_mes, validade_ano, cvv) {
    try {
      const novoCartao = 'INSERT INTO cartao (numero, nome_titular, validade_mes, validade_ano, cvv) VALUES ($1, $2, $3, $4, $5)';
      await db.query(novoCartao, [numero, nome_titular, validade_mes, validade_ano, cvv]);
      console.log('Dados do cartão inseridos com sucesso');
    } catch (err) {
      console.error(err);
    } finally {
      //await db.end()
    }
  }

  return insereDadosCartao(numero, nome_titular, validade_mes, validade_ano, cvv);
}

module.exports = {
  insertCartao: insertCartao
};
