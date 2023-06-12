const bcrypt = require("bcrypt");

const encryptCardNumber = async (cardNumber) => {
  const saltRounds = 10;
  const cardNumberString = cardNumber.toString();
  const hashedCardNumber = await bcrypt.hash(cardNumberString, saltRounds);
  return hashedCardNumber;
};

const compareCardNumber = async (cardNumber, hashedCardNumber) => {
  const match = await bcrypt.compare(cardNumber, hashedCardNumber);
  return match;
};

const storeCardNumber = async (cardNumber) => {
  const encryptedCardNumber = await encryptCardNumber(cardNumber);
  return encryptedCardNumber;
};

module.exports = { encryptCardNumber, compareCardNumber, storeCardNumber };
