const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const insertUsuario = require("../DB/insertUsuario");
const { validarErros }= require("../Middlewares/validarErrors");

router.get("/cadastro", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.post(
  "/add-usuario",
  [
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
  ],
  validarErros,
  async function (req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { senha } = req.body;
    const saltRounds = 10;

    try {
      const hashedPassword = await bcrypt.hash(senha, saltRounds);

      insertUsuario
        .insertUsuario(
          req.body.nome,
          req.body.sobrenome,
          req.body.email,
          req.body.cpf,
          hashedPassword,
          req.body.endereco,
          req.body.telefone,
          req.body.data_nascimento,
          req.body.nome_usuario
        )
        .then(function () {
          res.redirect("/login");
        })
        .catch(function (erro) {
          res.send("Não foi possível inserir o usuário" + erro);
        });
    } catch (err) {
      console.log(err);
      res.status(500).send("Ocorreu um erro");
    }
  }
);

module.exports = router;
