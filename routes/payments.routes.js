const express = require("express");
const router = express.Router();
const { validatePayment } = require("../validators/payment.validator.js");
const { payments, users } = require("../data.js");

router.post("/", (req, res) => {
    // Validate the payment request body
    const { valid, code } = validatePayment(req.body);
    if (!valid) return res.sendStatus(code);
    
    // Ensure at least one user exists
    if (users.length === 0) {
    return res.sendStatus(404);
    }

    // Check if card number belongs to a registered user
    const exists = users.find(user => user.cardNumber === req.body.cardNumber);
    if (!exists) {
    return res.sendStatus(404);
    }

    // Save new payment
    payments.push(req.body);
    return res.sendStatus(201);
  
});

module.exports = router; 

