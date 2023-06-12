const { body } = require("express-validator");

const loginValidationRules = [
  body("nome_usuario").notEmpty().withMessage("O campo nome de usuário é obrigatório"),
  body("senha").notEmpty().withMessage("O campo senha é obrigatório"),
];

module.exports = { loginValidationRules };
