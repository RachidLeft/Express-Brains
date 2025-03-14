const mongoose = require('mongoose');

//Création de la table utilisateur
const User = mongoose.model('User', {
    email :String, 
    pseudo: String,
    password: String,
    uuid: String,
    admin: Boolean
})

module.exports = User;