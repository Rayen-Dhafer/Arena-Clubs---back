const mongoose = require('mongoose')

const schema = mongoose.Schema({

    email : String,
    group_name : String,
    image : String,
    statu: String,
    date : String,
    time : String,
    nb_like: Number,
    nom:String,
    img_p:String,

})

module.exports = mongoose.model('Post' , schema)


