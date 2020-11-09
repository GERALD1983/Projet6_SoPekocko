// variable module npm
const passValidator = require("password-validator");

const passSchema = new passValidator();

// declaration du shema du mot de passe

passSchema
  .is()
  .min(8)
  .is()
  .max(100)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits(2)
  .has()
  .not()
  .spaces()
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]);

// export du shema

module.exports = passSchema;
