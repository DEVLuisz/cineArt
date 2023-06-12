const { check } = require("express-validator");

const sanitizeCardInput = [
  check("numero").toInt(),
  check("nome_titular").trim().escape(),
  check("validade_mes").toInt(),
  check("validade_ano").toInt(),
  check("cvv").toInt(),
];

module.exports = { sanitizeCardInput };
