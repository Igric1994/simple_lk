const mongoose = require("mongoose");
 
const Schema = mongoose.Schema;
// установка схемы
const userScheme = new Schema({
    name: String,
    phone: String,
    email: String,
    aboutMe: String,
    login: String,
    pass: String,
    avatar: String
});

module.exports = mongoose.model("User", userScheme);