const { body, validationResult } = require("express-validator");

const cardValidationRules = [
  body('numero').notEmpty().withMessage('O campo número é obrigatório'),
  body('nome_titular').notEmpty().withMessage('O campo nome do titular é obrigatório'),
  body('validade_mes').notEmpty().withMessage('O campo mês de validade é obrigatório'),
  body('validade_ano').notEmpty().withMessage('O campo ano de validade é obrigatório'),
  body('cvv').notEmpty().withMessage('O campo CVV é obrigatório'),
];

const validateCardInput = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

module.exports = { cardValidationRules, validateCardInput };
