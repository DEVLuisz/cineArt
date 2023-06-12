const express = require("express");
const router = express.Router();
const { getCardDataByUserId } = require("../DB/Utils/getCardDataByUserId");
const { deleteCardByCardId } = require("../DB/Utils/deleteCardByCardId");
const { insertCartao } = require("../DB/insertCartao");
const { updateCardId } = require("../Update/updateCardData");
const { authenticate } = require("../Auth/Middleware/userAuthenticate");
const {
  cardValidationRules,
  validateCardInput,
} = require("../Auth/Private/inputValidation");
const { sanitizeCardInput } = require("../Auth/Private/inputSanitization");
const { loginLimiter } = require("../Auth/Private/bruteForceProtection");
const { apiLimiter } = require("../Auth/Private/rateLimiting");
const { encryptCardNumber} = require("../Auth/Private/encryptionCardNumber");

router.get('/card', authenticate, function (req, res) {
  const usuarioId = req.session.user.id;

  getCardDataByUserId(usuarioId)
    .then(function (dadosDoCartao) {
      res.render('card', { cartao: dadosDoCartao });
    })
    .catch(function (erro) {
      res.send('Erro ao obter os dados do cartão: ' + erro);
    });
});

router.get("/add-cartao", authenticate, function (req, res) {
  const usuarioId = req.session.user.id;

  getCardDataByUserId(usuarioId)
    .then(function (dadosDoCartao) {
      res.render('card', { cartao: dadosDoCartao });
    })
    .catch(function (erro) {
      res.send('Erro ao obter os dados do cartão: ' + erro);
    });
});

router.post(
  '/add-cartao',
  authenticate,
  loginLimiter,
  apiLimiter,
  cardValidationRules,
  validateCardInput,
  sanitizeCardInput,
  async function (req, res) {
    const { numero, nome_titular, validade_mes, validade_ano, cvv } = req.body;
    const usuarioId = req.session.user.id;

    try {
      const encryptedCardNumber = await encryptCardNumber(numero);

      insertCartao(encryptedCardNumber, nome_titular, validade_mes, validade_ano, cvv, usuarioId)
        .then(function (cartaoId) {
          const cardId = cartaoId;

          updateCardId(req.session.user.id, cardId)
            .then(function () {
              res.redirect('/perfil');
            })
            .catch(function (erro) {
              res.send('Não foi possível atualizar o card_id do usuário: ' + erro);
            });
        })
        .catch(function (erro) {
          res.send('Não foi possível inserir o cartão: ' + erro);
        });
    } catch (error) {
      res.send('Erro ao criptografar o número do cartão: ' + error);
    }
  }
);

router.delete('/card/:id', authenticate, function (req, res) {
  const cardId = req.params.id;

  deleteCardByCardId(cardId)
    .then(function () {
      res.json({ message: 'Cartão excluído com sucesso' });
    })
    .catch(function (erro) {
      res.status(500).json({ message: 'Erro ao excluir o cartão: ' + erro });
    });
});

module.exports = router;
