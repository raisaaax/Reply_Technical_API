const express = require("express");
const app = express();
const usersRouter = require("./routes/users.routes.js");
const paymentsRouter = require("./routes/payments.routes.js");

// Middleware to parse JSON bodies
app.use(express.json());

//Set endpoints for users and payments
app.use("/users", usersRouter);
app.use("/payments", paymentsRouter);

module.exports = app;