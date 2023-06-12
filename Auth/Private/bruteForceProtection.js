const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 3, 
  message: "Muitas tentativas de login, tente novamente mais tarde.",
});

module.exports = { loginLimiter };
