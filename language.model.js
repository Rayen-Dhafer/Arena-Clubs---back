const mongoose = require('mongoose')

const schema = mongoose.Schema({



    language : String,
})

module.exports = mongoose.model('language' , schema)