const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");

const saucesRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");

const path = require("path");
const { Session } = require("inspector");

const nocache = require("nocache");

mongoose
  .connect(
    "mongodb+srv://gerald:mongodb57@cluster0.tydef.mongodb.net/sopecko?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(
  cookieSession({
    name: "session",
    secret: "s3CuR3T3",
    cookie: {
      secure: false,
      httpOnly: true,
      domain: "http://localhost:3000/",
    },
  })
);

app.use(nocache());

app.use(bodyParser.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/sauces", saucesRoutes);

app.use("/api/auth", userRoutes);

module.exports = app;
