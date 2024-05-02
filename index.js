const express = require("express");
const con = require ('./Database/config');
const router = require("./Router/router");
const app = new express();
const PORT=process.env.PORT || 3000;

app.use(express.json())
app.use(router)

app.listen(PORT, () => {
  console.log(`Port start will be ${PORT}`);
});
