const { testRegex } = require("../validators/user.validator.js");

// Validate payment details
function validatePayment(payment) {
  // Regular expressions
  const cardNumberIsValid = () => testRegex(payment.cardNumber, /^\d{16}$/);
  const amountIsValid = () => testRegex(String(payment.amount), /^\d{1,3}$/);

  // Check for invalid fields
  if (!cardNumberIsValid() || !amountIsValid()) {
    return { valid: false, code: 400 };
  }

  //Successful validation
  return { valid: true, code: 201 };
}

module.exports = { validatePayment };