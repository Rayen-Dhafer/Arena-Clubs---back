const mongoose = require('mongoose')

const schema = mongoose.Schema({

    email_like : String,
    email_img : String,
    group_name : String,
    image : String,
    
})

module.exports = mongoose.model('Jaime' , schema)

