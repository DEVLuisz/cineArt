const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 100, 
  message: "Muitas solicitações deste IP, tente novamente mais tarde.",
});

module.exports = { apiLimiter };
