const mongoose = require('mongoose')

const schema = mongoose.Schema({

    email : String,
    group_name : String,
    
    

})

module.exports = mongoose.model('Album' , schema)

