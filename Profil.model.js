const mongoose = require('mongoose')

const schema = mongoose.Schema({
    email : String,

    bio: String,
    facebook: String,
    instagram: String,
    twitter: String,
    linkedin: String,


})

module.exports = mongoose.model('Utilisateur' , schema)

