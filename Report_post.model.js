const mongoose = require('mongoose')
var ObjectId = mongoose.ObjectId;
const schema = mongoose.Schema({

    report_from:String,
    report_account:String,
  
    report_msg:String,
    report_post:String,
  
    report_from_name:String,
    report_from_img:String,
  
    vu:Boolean
})

module.exports = mongoose.model('Post signalé' , schema)
