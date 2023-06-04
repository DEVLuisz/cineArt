const express = require("express");
const router = express.Router();
const cadastroRoutes = require("./cadastroRoutes");
const loginRoutes = require("./loginRoutes");
const cardRoutes = require("./cardRoutes");

router.use(cadastroRoutes);
router.use(loginRoutes);
router.use(cardRoutes);

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;
