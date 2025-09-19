const express = require("express");
const router = express.Router();
const { validatePayment } = require("../validators/payment.validator.js");
const { payments, users } = require("../data.js");



router.post("/", (req, res) => {

    const { valid, code } = validatePayment(req.body);
    if (!valid) return res.sendStatus(code);

    //check if card number is registered against an user 
    const exists = users.some(payment => payment.creditCardNumber === req.body.creditCardNumber);
    if (!exists) return res.sendStatus(404);

  //save new payment if valid credentials 
    payments.push(req.body);
    return res.sendStatus(201);
  
});

module.exports = router; 

