const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const insertUsuario = require("../DB/insertUsuario");
const { validarErros }= require("../Middlewares/validarErrors");
const { usuarioValidationRules, validateUsuarioInput } = require("../Middlewares/usuarioValidation");

router.get("/cadastro", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.post(
  "/add-usuario",
  usuarioValidationRules,
  validateUsuarioInput,
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
