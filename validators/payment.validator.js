const { testRegex } = require("../validators/user.validator.js");

function validatePayment(payment) {
  // Regular expressions
  const creditCardNumber = () => testRegex(payment.creditCardNumber, /^\d{16}$/);
  const amountIsValid = () => testRegex(String(payment.amount), /^\d{1,3}$/);

  if (!creditCardNumber() || !amountIsValid()) {
    return { valid: false, code: 400 };
  }
    return { valid: true, code: 201 };
}

module.exports = { validatePayment };