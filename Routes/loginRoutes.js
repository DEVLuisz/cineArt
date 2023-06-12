const express = require("express");
const router = express.Router();
const path = require("path");
const bcrypt = require("bcrypt");
const db = require("../DB/conexao");
const { formatarCPF } = require("../Utils/regexpCPF");
const { formatarTelefone } = require("../Utils/regexpTelefone");
const { loginValidationRules } = require("../Auth/Private/loginValidationRules");
const { validateLoginInput } = require("../Auth/Private/validateLoginInput");
const { loginLimiter } = require("../Auth/Private/bruteForceProtection");
const { apiLimiter } = require("../Auth/Private/rateLimiting");

router.get("/login", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/login.html"));
});

router.post(
  "/login",
  loginLimiter,
  loginValidationRules, 
  validateLoginInput, 
  apiLimiter,
  async (req, res) => {
    const { nome_usuario, senha } = req.body;

    try {
      const result = await db.query(
        "SELECT * FROM usuarios WHERE nome_usuario = $1",
        [nome_usuario]
      );

      if (result.rows.length === 0) {
        return res.status(401).send("Usuário não encontrado");
      }

      const user = result.rows[0];

      const match = await bcrypt.compare(senha, user.senha);

      if (!match) {
        return res.status(401).send("Senha incorreta");
      }

      req.session.user = user;
      req.session.senhaDigitada = senha;

      res.redirect("/perfil");
    } catch (err) {
      console.log(err);
      res.status(500).send("Ocorreu um erro");
    }
  }
);

router.get("/perfil", async (req, res) => {
  const user = req.session.user;
  const senhaDigitada = req.session.senhaDigitada;

  if (!user) {
    return res.redirect("/login");
  }

  try {
    const usuarioFormatado = {
      ...user,
      cpf: formatarCPF(user.cpf),
      telefone: formatarTelefone(user.telefone),
      senha: senhaDigitada,
    };

    res.render("perfil", { usuario: usuarioFormatado });
  } catch (err) {
    console.log(err);
    res.status(500).send("Ocorreu um erro");
  }
});

router.get("/alterar", async (req, res) => {
  const user = req.session.user;

  if (!user) {
    return res.redirect("/login");
  }

  res.render("perfil", { usuario: user });
});

router.put("/alterar", async (req, res) => {
  const user = req.session.user;

  if (!user) {
    return res.redirect("/login");
  }

  const { email, senha, telefone, nome_usuario } = req.body;

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(senha, saltRounds);

    const result = await db.query(
      "UPDATE usuarios SET email=$1, senha=$2, telefone=$3, nome_usuario=$4 WHERE id=$5 RETURNING *",
      [email, hashedPassword, telefone, nome_usuario, user.id]
    );

    if (result.rows.length === 0) {
      return res.status(401).send("Erro ao atualizar usuário");
    }

    req.session.user = {
      ...result.rows[0],
      senha: hashedPassword,
    };

    res.redirect("/perfil");
  } catch (err) {
    console.log(err);
    res.status(500).send("Ocorreu um erro");
  }
});

router.post("/logout", function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/login");
    }
  });
});

module.exports = router;
