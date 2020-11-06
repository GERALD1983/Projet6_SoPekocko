const passSchema = require("../models/password");

module.exports = (req, res, next) => {
  if (!passSchema.validate(req.body.password)) {
    return res.status(400).json({
      error:
        "mot de passe pas assez fort ! au moins une minuscule et majuscule 8 caracter min et 100 max 2 chiffre min pas d'espace" +
        passSchema.validate("retente ta chance", { list: true }),
    });
  } else {
    next();
  }
};
