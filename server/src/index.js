const express = require("express");
const routes = require("./routes");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config({
  path: require("path").resolve(__dirname,"../.env"),
})

const app = express();
const port = process.env.PORT || 3003;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

routes(app);

mongoose
  .connect("mongodb://localhost:27017/ecomerce_shop")
  .then(() => {
    console.log("Connected !!! ");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
