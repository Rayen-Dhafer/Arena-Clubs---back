const mongoose = require('mongoose')

const schema = mongoose.Schema({
    nom : String,
    mot_de_passe : String,
    email : String,
    image : String,

    ville : String,
    tele : String,
    anniversaire : String,
    genre : String,
    email_contact : String,
    
    ville_partnership : Boolean,
    tele_partnership : Boolean,
    email_partnership : Boolean,
    anniversaire_partnership : Boolean,

    verif_code : String,
    validation : Boolean,
    active: Boolean,
})

module.exports = mongoose.model('Etudiant' , schema)

