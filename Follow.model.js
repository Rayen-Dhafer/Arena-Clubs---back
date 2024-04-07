const mongoose = require('mongoose')

const schema = mongoose.Schema({
    email_followed : String,
    name_followed : String,
    img_followed : String,

    email_follow : String,
    name_follow : String,
    img_follow : String,

})

module.exports = mongoose.model('Suivre' , schema)

