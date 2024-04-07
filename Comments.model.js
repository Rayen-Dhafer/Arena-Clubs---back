const mongoose = require('mongoose')

const schema = mongoose.Schema({


    email_img : String,
    group_name : String,
    image : String,

    email_comment : String,
    name_comment: String,
    img_comment : String,

    comment : String,
    time : String,
    
})

module.exports = mongoose.model('Commentaire' , schema)

