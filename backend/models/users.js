// variable module mongoose
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// declaration shema de l utilsateur et utilsation limite a une seule adresse mail

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
