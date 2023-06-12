const db = require("../conexao");

async function lista() {
  await db.connect;
  resultado = await db.query("SELECT * FROM ADMs");
  console.log(resultado.rows);
}

module.exports = {
  lista
};