const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name_user : String,
    email_user : String,
    image_user : String,


    email_to : String,
 
})

module.exports = mongoose.model(`Demande d'ami` , schema)

