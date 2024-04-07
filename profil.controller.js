const UtilisateurModel = require("./Utilisateur.model");
const ProfilModel = require("./Profil.model");
const GroupModel = require("./Group.model");
const imageModel = require("./Image.model");
const nodemailer = require('nodemailer')
const followModel = require("./Follow.model");
const notificationModel = require("./Notification.model");





exports.changetest=  async(requete , reponse)=>{
    const user = await ProfilModel.findOne({ email: requete.body.email})
    if (user) {
        user.test_tel=requete.body.test_tel;
        user.test_birthday=requete.body.test_birthday;
        user.test_adress=requete.body.test_adress;
        user.test_mail=requete.body.test_mail;
        await user.save()
    } 
    }

 exports.modify=  async(requete , reponse)=>{
    const user = await ProfilModel.findOne({ email: requete.body.email})
    if (user) {
        user.tel=requete.body.tel;
        user.adress=requete.body.adress;
        user.birthday=requete.body.birthday;
        await user.save();
    }  
}

exports.modify_bio=  async(requete , reponse)=>{

    const user = await ProfilModel.findOne({ email: requete.body.email})
    if (user) {
        user.bio=requete.body.bio;
        await user.save();
    }  
}









