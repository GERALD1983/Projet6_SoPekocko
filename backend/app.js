// variables de stockage module npm
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");

// variables de stockage des routes

const saucesRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");

// variables modules path et inspector npm

const path = require("path");
const { Session } = require("inspector");

// desactive le cache

const nocache = require("nocache");

// connection a la base de donnee

mongoose
  .connect(
    "mongodb+srv://gerald:mongodb57@cluster0.tydef.mongodb.net/sopecko?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// appel  d express dans applicaion

const app = express();

// methode pour modifier le cors le systeme de securite

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

// securiser la session avec httponly et change de nom session par defaut

app.use(
  cookieSession({
    name: "session",
    secret: "s3CuR3T3",
    cookie: {
      secure: true,
      httpOnly: true,
      domain: "http://localhost:3000/",
    },
  })
);

// appel de fonction desactive cache
app.use(nocache());

// desactive x-powered-by activer par defaut les intrus peuvent utilser cette entete et lancer une attaque
app.disable("x-powered-by");

// pour les demandes de post traite l objet json
app.use(bodyParser.json());

// gere les images dans le fichier image qui est statique
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/sauces", saucesRoutes);

app.use("/api/auth", userRoutes);

module.exports = app;
