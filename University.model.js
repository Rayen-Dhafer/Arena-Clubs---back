const mongoose = require('mongoose')

const schema = mongoose.Schema({

    university : String,
    email : String,
  
})

module.exports = mongoose.model('University' , schema)

