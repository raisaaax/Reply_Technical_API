const express = require("express");
const app = express();
const usersRouter = require("./routes/users.routes.js");
const paymentsRouter = require("./routes/payments.routes.js");

app.use(express.json());
app.use("/users", usersRouter);
app.use("/payments", paymentsRouter);

module.exports = app;