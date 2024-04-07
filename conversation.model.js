const mongoose = require('mongoose')

const schema = mongoose.Schema({

    name_user_1 : String,
    email_user_1 : String,
    image_user_1: String,
 

    name_user_2 : String,
    email_user_2 : String,
    image_user_2: String,
 

    last_msg : String,
    vu : Boolean
    
})

module.exports = mongoose.model('Conversation' , schema)