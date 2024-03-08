const mongoose = require("mongoose"); //Importing mongoose ODM from "mongoose"

const { Schema } = require("mongoose"); //Importing Schema middleware from "mongoose"

const userSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  place: {
    type: Schema.Types.String,
    required: true,
  },
  password:{
    type: Schema.Types.String,
    required: true,
  }
}); //Format for preparing a Schema using new Schema()

const mongooseModel = mongoose.model("user", userSchema); //This is how we have to create a mongoose model

module.exports = { mongooseModel }; //Exporting {mongooseModel}
