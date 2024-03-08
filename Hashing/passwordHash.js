const bcrypt = require("bcrypt"); //Importing bcrypt from "bcrypt"

const saltRounds = 10;

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(saltRounds);

  return bcrypt.hashSync(password, salt);
}; //Format for hashing the password

module.exports = { hashPassword }; //Exporting the hashPassword function
