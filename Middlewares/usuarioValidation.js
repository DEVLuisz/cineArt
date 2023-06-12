const { body } = require("express-validator");

exports.usuarioValidationRules = [
  body("nome").notEmpty().isLength({ max: 15 }).withMessage("O campo nome é obrigatório"),
    body("sobrenome").notEmpty().isLength({ max: 20 }).withMessage("O campo sobrenome é obrigatório"),
    body("email")
      .notEmpty()
      .withMessage("O campo email é obrigatório")
      .isEmail()
      .isLength({ max: 40 })
      .withMessage("Email inválido"),
    body("cpf").notEmpty().withMessage("O campo CPF é obrigatório"),
    body("senha")
      .notEmpty()
      .withMessage("O campo senha é obrigatório")
      .isLength({ min: 8 })
      .withMessage("A senha deve ter no mínimo 8 caracteres"),
    body("endereco").notEmpty().isLength({ max: 30 }).withMessage("O campo endereço é obrigatório"),
    body("telefone").notEmpty().withMessage("O campo telefone é obrigatório"),
    body("data_nascimento")
      .notEmpty()
      .withMessage("O campo data de nascimento é obrigatório"),
    body("nome_usuario").notEmpty().isLength({ max: 20 }).withMessage("O campo Nome de Usuário é obrigatório"),
];

exports.validateUsuarioInput = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};
