const express = require("express");
const router = express.Router();
const path = require("path");
const { getCardDataByUserId } = require("../DB/Utils/getCardDataByUserId");
const { insertCartao } = require("../DB/insertCartao");

router.get("/card", async (req, res) => {
  const user = req.session.user;

  if (!user) {
    return res.redirect("/login");
  }

  try {
    const cardData = await getCardDataByUserId(user.id);

    if (cardData === null) {
      return res.redirect("/add-cartao");
    }

    res.sendFile(path.join(__dirname, "../public/Dist/card.html"));
  } catch (err) {
    console.log(err);
    res.status(500).send("Ocorreu um erro");
  }
});

router.get("/add-cartao", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/Dist/card.html"));
});

router.post("/add-cartao", (req, res) => {
  const { numero, nome_titular, validade_mes, validade_ano, cvv } = req.body;

  insertCartao(numero, nome_titular, validade_mes, validade_ano, cvv)
    .then(() => {
      res.redirect("/perfil");
    })
    .catch((error) => {
      console.log(error);
      res.send("Ocorreu um erro ao inserir os dados do cartão");
    });
});

module.exports = router;
