const mongoose = require('mongoose')

const schema = mongoose.Schema({
    email_do : String,
    email_to : String,
    vu: Boolean,


    msg : String,
    img_profil : String,
    name: String,

    img_do : String,

})

module.exports = mongoose.model('notification' , schema)

