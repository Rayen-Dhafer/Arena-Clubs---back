const mongoose = require('mongoose')

const schema = mongoose.Schema({
    nom : String,
    mot_de_passe : String,
    email : String,
    image : String,
    couverture : String,

    email_contact : String,
    ville : String,
    tele : String,
    nom_universite  : String,
    signe : String,

    verif_code : String,
    validation : Boolean,
    active: Boolean,
})

module.exports = mongoose.model('Club' , schema)

