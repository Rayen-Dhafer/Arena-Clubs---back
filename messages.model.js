const mongoose = require('mongoose')

const schema = mongoose.Schema({


    email_send : String,
    img_send : String,
    
    email_to : String,

    msg : String,
    time : String,

    
})

module.exports = mongoose.model('messages' , schema)

