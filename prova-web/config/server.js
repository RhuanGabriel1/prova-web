const express = require('express');
const app = express();
require("dotenv/config");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.listen(port);

module.exports = app;