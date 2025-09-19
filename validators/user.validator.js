function testRegex(value, regex, optional = false) {
  if (optional && !value) return true; // Allow empty if optional
  return regex.test(value);
}

function checkUserAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  return Math.floor((today - birthDate) / (365.25 * 24 * 60 * 60 * 1000));
}

function validateUser(user) {
  const isValidUsername = () => testRegex(user.username, /^[A-Za-z0-9]+$/);
  const isValidPassword = () => testRegex(user.password, /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/);
  const isValidEmail = () => testRegex(user.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  const isValidDateOfBirth = () => testRegex(user.dob, /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/) && !isNaN(Date.parse(user.dob));
  const isValidCardNumber = () => testRegex(user.cardNumber, /^\d{16}$/, true);

  // Field validation
  if (!isValidUsername() || !isValidPassword() || !isValidEmail() || !isValidDateOfBirth() || !isValidCardNumber()) {
    return { valid: false, code: 400};
  }

  // Age restriction
  if (checkUserAge(user.dob) < 18) {
    return { valid: false, code: 403};
  }

  return { valid: true, code: 201 };
}

module.exports = { validateUser, testRegex, checkUserAge };
