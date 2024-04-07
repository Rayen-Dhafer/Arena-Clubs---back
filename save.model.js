
const mongoose = require('mongoose')
var ObjectId = mongoose.ObjectId;
const schema = mongoose.Schema({

    id_post_saved : ObjectId,
    email_saved : String,
    
})

module.exports = mongoose.model('Enregistrement' , schema)

