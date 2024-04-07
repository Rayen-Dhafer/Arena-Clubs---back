const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name_user : String,
    email_user : String,
    image_user : String,

   // name_club : String,
    email_club : String,
    //image_club : String,
})

module.exports = mongoose.model(`Demande d'adhésion` , schema)

