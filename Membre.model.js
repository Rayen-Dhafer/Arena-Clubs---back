const mongoose = require('mongoose')

const schema = mongoose.Schema({

    name_user : String,
    email_user : String,
    image_user : String,

    name_club : String,
    email_club : String,
    image_club : String,
    role : String,
    date : Number,
    
})

module.exports = mongoose.model('Membre' , schema)