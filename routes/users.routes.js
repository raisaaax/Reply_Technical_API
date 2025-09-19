const express = require("express");
const router = express.Router();
const { validateUser } = require("../validators/user.validator.js");
const { users } = require("../data.js");



//registration of new user POST request
router.post("/", (req, res) => {
  const { valid, code } = validateUser(req.body);
  
  if (!valid) {
    return res.sendStatus(code);
};

  // Duplicate username check (409)
  const exists = users.some(user => user.username === req.body.username);
  if (exists) {
    return res.sendStatus(409);
  }

  // Save new user
  users.push(req.body);

  // Success (201)
  return res.sendStatus(201);
});

// GET /users with optional CreditCard filter
router.get("/", (req, res) => {
  const filter = (req.query.CreditCard || "").toLowerCase(); 
  let result = users;
  if (filter === "yes") {
    result = users.filter(user => !!user.cardNumber);
  } else if (filter === "no") {
    result = users.filter(user => !user.cardNumber);
  }

  res.json(result);
});


module.exports = router;
