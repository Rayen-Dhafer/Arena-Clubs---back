const UtilisateurModel = require("./Utilisateur.model");
const ProfilModel = require("./Profil.model");
const nodemailer = require('nodemailer')
const ClubModel = require("./club.model");
const membreModel = require("./membre.model");
const ComModel = require("./Comments.model");
const followModel = require("./Follow.model");
const friendsModel = require("./friends.model");
const imageModel = require("./Image.model");
const messageModel = require("./messages.model");
const nottifModel = require("./Notification.model");
const Report_aModel = require("./Report_account.model");
const Report_pModel = require("./Report_post.model");
const ReqModel = require("./Request.model");
const ReqfModel = require("./Request_friends.model");

const conversationModel = require("./conversation.model");
const universityModel = require("./University.model");
const bcrypt = require('bcrypt');









exports.changename =  async(requete , reponse)=>{

    const user = await UtilisateurModel.findOne({ email: requete.body.email})
    const club = await ClubModel.findOne({ email: requete.body.email})

    if (requete.body.name && (user || club)) {
        if(user){
            user.nom=requete.body.name
            await user.save();
            const membr = await membreModel.find({ email_user: requete.body.email})
            membr.forEach(function(device) { device.name_user = requete.body.name; device.save(); });
            const req1 = await ReqModel.find({ email_user: requete.body.email})
            const req2 = await ReqfModel.find({ email_user: requete.body.email})
            req1.forEach(function(device) { device.name_user = requete.body.name; device.save(); });
            req2.forEach(function(device) { device.name_user = requete.body.name; device.save(); });
        }
        else{
            club.nom=requete.body.name
            await club.save();
            const membr = await membreModel.find({ email_club: requete.body.email})
            membr.forEach(function(device) { device.name_club = requete.body.name; device.save(); }); 
        }
        
        const comments = await ComModel.find({ email_comment: requete.body.email})
        const conversation = await conversationModel.find({ email_user_1: requete.body.email})
        const conversation2 = await conversationModel.find({ email_user_2: requete.body.email})
        const follow = await followModel.find({ email_followed: requete.body.email})
        const follow2 = await followModel.find({ email_follow: requete.body.email})
        const friends = await friendsModel.find({ email_user_1: requete.body.email})
        const friends2 = await friendsModel.find({ email_user_2: requete.body.email})
        const img = await imageModel.find({ email: requete.body.email})
        const nottif = await nottifModel.find({ email_do: requete.body.email})
        const repa = await Report_aModel.find({ report_from: requete.body.email})
        const repp = await Report_pModel.find({ report_from: requete.body.email})


        
        comments.forEach(function(device) {  device.name_comment = requete.body.name;  device.save(); });
        conversation.forEach(function(device) { device.name_user_1 = requete.body.name;   device.save(); });
        conversation2.forEach(function(device) { device.name_user_2 = requete.body.name; device.save(); });
        follow.forEach(function(device) { device.name_followed = requete.body.name; device.save(); });
        follow2.forEach(function(device) { device.name_follow = requete.body.name; device.save(); });
        friends.forEach(function(device) { device.name_user_1 = requete.body.name; device.save(); });
        friends2.forEach(function(device) { device.name_user_2 = requete.body.name; device.save(); });
        img.forEach(function(device) { device.nom = requete.body.name; device.save(); });
        nottif.forEach(function(device) { device.name = requete.body.name; device.save(); });
        repa.forEach(function(device) { device.report_from_name = requete.body.name; device.save(); });
        repp.forEach(function(device) { device.report_from_name = requete.body.name; device.save(); });

        reponse.send({   type:'success'}) 
    } else {
        reponse.send({  type:'error'})
    }
}

exports.Upimage=  async(requete , reponse)=>{
    const user = await UtilisateurModel.findOne({ email: requete.body.email}) 
    const club = await ClubModel.findOne({ email: requete.body.email})

    if (user || club) {
        if (user) {
        user.image=requete.body.image;
        await user.save();
        const membr = await membreModel.find({ email_user: requete.body.email})
        membr.forEach(function(device) { device.image_user = requete.body.image; device.save(); });
        const req1 = await ReqModel.find({ email_user: requete.body.email})
        const req2 = await ReqfModel.find({ email_user: requete.body.email})
        req1.forEach(function(device) { device.image_user = requete.body.image; device.save(); });
        req2.forEach(function(device) { device.image_user = requete.body.image; device.save(); });
     }
        else{
            club.image=requete.body.image;
            await club.save();
            const membr = await membreModel.find({ email_club: requete.body.email})
            membr.forEach(function(device) { device.image_club = requete.body.image; device.save(); });
        }

        const comments = await ComModel.find({ email_comment: requete.body.email})
        const conversation = await conversationModel.find({ email_user_1: requete.body.email})
        const conversation2 = await conversationModel.find({ email_user_2: requete.body.email})
        const follow = await followModel.find({ email_followed: requete.body.email})
        const follow2 = await followModel.find({ email_follow: requete.body.email})
        const friends = await friendsModel.find({ email_user_1: requete.body.email})
        const friends2 = await friendsModel.find({ email_user_2: requete.body.email})
        const img = await imageModel.find({ email: requete.body.email})
        const message = await messageModel.find({ email_send: requete.body.email})
        const nottif = await nottifModel.find({ email_do: requete.body.email})
        const repa = await Report_aModel.find({ report_from: requete.body.email})
        const repp = await Report_pModel.find({ report_from: requete.body.email})


        comments.forEach(function(device) {    device.img_comment = requete.body.image; device.save();   });
        conversation.forEach(function(device) { device.image_user_1 = requete.body.image;   device.save(); });
        conversation2.forEach(function(device) { device.image_user_2 = requete.body.image; device.save(); });
        follow.forEach(function(device) { device.img_followed = requete.body.image; device.save(); });
        follow2.forEach(function(device) { device.img_follow = requete.body.image; device.save(); });
        friends.forEach(function(device) { device.image_user_1 = requete.body.image; device.save(); });
        friends2.forEach(function(device) { device.image_user_2 = requete.body.image; device.save(); });
        img.forEach(function(device) { device.img_p = requete.body.image; device.save(); });
        message.forEach(function(device) { device.img_send = requete.body.image; device.save(); });
        nottif.forEach(function(device) { device.img_profil = requete.body.image; device.save(); });
        repa.forEach(function(device) { device.report_from_img = requete.body.image; device.save(); });
        repp.forEach(function(device) { device.report_from_img = requete.body.image; device.save(); });

        reponse.send({   type:'success'}) 
    } 
    else{
        reponse.send({  type:'error'})
    }

}











exports.validate =async(requete , reponse)=>{
    const new_profil = new ProfilModel()
    const user = await UtilisateurModel.findOne({ email: requete.body.email})
    const club = await ClubModel.findOne({ email: requete.body.email})
    if(user || club ){
    if (user) {
        if(user.validation == 1){
            reponse.send({ msg: "Your account was already valid , try to connect",type:'info'})
        }else{
            if(user.verif_code == requete.body.verif_code){
            user.validation = 1;
            new_profil.email=requete.body.email;

            new_profil.bio="",
            new_profil.facebook="",
            new_profil.instagram="",
            new_profil.twitter="",
            new_profil.linkedin="",

            await user.save()
            await new_profil.save();
            reponse.send({ msg: "Suuccess account valid",type:'success',name:user.nom})
            }else{
                reponse.send({ msg: "check your code",type:'error'})
            }
        }
    } 
    if (club) {
        if(club.validation == 1){
            reponse.send({ msg: "Your account was already valid , try to connect",type:'info'})
        }else{
            if(club.verif_code == requete.body.verif_code){
                club.validation = 1;
                new_profil.email=requete.body.email;

                new_profil.bio="",
                new_profil.facebook="",
                new_profil.instagram="",
                new_profil.twitter="",

            await club.save()
            await new_profil.save();
            reponse.send({ msg: "Suuccess account valid",type:'success',name:club.nom})
            }else{
                reponse.send({ msg: "check your code",type:'error'})
            }
        }
    } 
}
else{
    reponse.send({ msg: "erreur" , type:'error'})
}
}


exports.inscription =  async (requete, reponse) => {

    const exist_email_user = await UtilisateurModel.findOne({ email: requete.body.email })
    const exist_email_club = await ClubModel.findOne({ email: requete.body.email })
    if (exist_email_club || exist_email_user ) {
        reponse.send({ msg: "Email already used"  , type:'error'})
    } else {
        const user = new UtilisateurModel(requete.body)

            const verif_code = Math.floor(Math.random()*(999999-100000) +100000 )
            user.verif_code = verif_code

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(requete.body.mot_de_passe,salt);
            user.mot_de_passe=hash
            user.validation = false
            user.active = true
            user.ville_partnership = true,
            user.tele_partnership = true,
            user.email_partnership = true,
            user.anniversaire_partnership = true,
            await user.save();
            sendCodeVerification(requete.body.email , verif_code,requete.body.nom,"Verify your email")
            reponse.send({ msg: "Verification your email" , type:'info' })
    }

}



exports.login =  async(requete , reponse)=>{

    const exist_user = await UtilisateurModel.findOne({ email: requete.body.email  })
    const exist_club = await ClubModel.findOne({ email: requete.body.email  })

    if (exist_user || exist_club) {
    if (exist_user) {
        let compare = await bcrypt.compare(requete.body.password,exist_user.mot_de_passe)
        if(compare){
        if(exist_user.validation && exist_user.active){
            reponse.send({msg : 'Connecté' , login : "user", type:'success'})
        }else
        {   
            if(exist_user.validation == false){
            const verif_code1 = ( Math.floor(Math.random()*(999999-100000) +100000 ) ).toString()
            reponse.send({ msg:"Verification your email ",type: 'info' })
            exist_user.verif_code = verif_code1
            await exist_user.save();
            sendCodeVerification(exist_user.email , verif_code1,exist_user.name,"Verify your email")
            }
            else{reponse.send({ msg: "acc_disactive" , type:'error'}) }
        }
        }
        else{     reponse.send({ msg: "erreur_p" , type:'error'}) }
    } 
    if (exist_club) { 
        let compare = await bcrypt.compare(requete.body.password,exist_club.mot_de_passe)
        if(compare){
        if(exist_club.validation && exist_club.active){
            reponse.send({msg : 'Connecté' , login : "club", type:'success'})
        }else
        {   
            if(exist_club.validation == false){
            const verif_code1 = ( Math.floor(Math.random()*(999999-100000) +100000 ) ).toString()
            reponse.send({ msg:"Verification your email ",type: 'info' })
            exist_club.verif_code = verif_code1
            await exist_club.save();
            sendCodeVerification(exist_club.email , verif_code1,exist_club.name,"Verify your email")
            }
            else{reponse.send({ msg: "acc_disactive" , type:'error'}) }
        }
    }
    else{     reponse.send({ msg: "erreur_p" , type:'error'}) }
    } 
    }
    else{
            reponse.send({ msg: "erreur_e" , type:'error'})
    }
}

function sendCodeVerification(email, verif_code,name,msgg ) {
    //
    u="http://localhost:3000/images/notf.png"
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'arena1clubs@gmail.com',
            pass: 'oaaoplcoilhjabtp'
            
        },
        secure : true
    });
    var mailOptions = {
        from: 'Arena Clubs',
        to: email,
        subject: 'Account Verification',
        text: 'welcome!',
        html: `
        <!DOCTYPE html>
<html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml"><head><title></title><meta content="text/html; charset=utf-8" http-equiv="Content-Type"/><meta content="width=device-width,initial-scale=1" name="viewport"/><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><style>
*{box-sizing:border-box}body{margin:0;padding:0}a[x-apple-data-detectors]{color:inherit!important;text-decoration:inherit!important}#MessageViewBody a{color:inherit;text-decoration:none}p{line-height:inherit}.desktop_hide,.desktop_hide table{mso-hide:all;display:none;max-height:0;overflow:hidden}@media (max-width:660px){.desktop_hide table.icons-inner{display:inline-block!important}.icons-inner{text-align:center}.icons-inner td{margin:0 auto}.image_block img.big,.row-content{width:100%!important}.mobile_hide{display:none}.stack .column{width:100%;display:block}.mobile_hide{min-height:0;max-height:0;max-width:0;overflow:hidden;font-size:0}.desktop_hide,.desktop_hide table{display:table!important;max-height:none!important}}
</style></head><body style="background-color:#f8f8f9;margin:0;padding:0;-webkit-text-size-adjust:none;text-size-adjust:none"><table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#f8f8f9" width="100%"><tbody><tr><td><table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#1aa19c" width="100%"><tbody><tr><td><table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;color:#000;background-color:#1aa19c;width:640px" width="640"><tbody><tr><td class="column column-1" style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-align:top;padding-top:0;padding-bottom:0;border-top:0;border-right:0;border-bottom:0;border-left:0" width="100%"><table border="0" cellpadding="0" cellspacing="0" class="divider_block block-1" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0" width="100%"><tr><td class="pad">
<div align="center" class="alignment"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0" width="100%"><tr><td class="divider_inner" style="font-size:1px;line-height:1px;border-top:4px solid #1aa19c"><span> </span></td></tr></table></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0" width="100%"><tbody><tr><td><table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;color:#000;width:640px" width="640"><tbody><tr><td class="column column-1" style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-align:top;padding-top:5px;padding-bottom:5px;border-top:0;border-right:0;border-bottom:0;border-left:0" width="100%"><table border="0" cellpadding="0" cellspacing="0" class="empty_block block-1" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0" width="100%"><tr><td class="pad"><div></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0" width="100%"><tbody><tr><td><table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#fff;color:#000;width:640px" width="640"><tbody><tr><td class="column column-1" style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-align:top;padding-top:0;padding-bottom:0;border-top:0;border-right:0;border-bottom:0;border-left:0" width="100%"><table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0" width="100%">
<tr><td class="pad" style="width:100%;padding-right:0;padding-left:0"><div align="center" class="alignment" style="line-height:10px"><form style="outline:none" tabindex="-1" target="_blank"><img class="big" src="https://media1.giphy.com/media/jSe6jtxh1N614a1IjC/giphy.gif?cid=790b76110503418342c06ad0df82e3e89abe853e7ad4b2e6&rid=giphy.gif&ct=g" style="display:block;height:auto;border:0;width:640px;max-width:100%" width="640"/></form></div></td>
</tr></table><table border="0" cellpadding="0" cellspacing="0" class="divider_block block-2" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0" width="100%"><tr><td class="pad" style="padding-top:30px"><div align="center" class="alignment"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0" width="100%"><tr><td class="divider_inner" style="font-size:1px;line-height:1px;border-top:0 solid #bbb"><span> </span>
</td></tr></table></div></td></tr></table><table border="0" cellpadding="0" cellspacing="0" class="text_block block-3" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word" width="100%"><tr><td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px"><div style="font-family:Arial,sans-serif"><div class="" style="font-size:12px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;mso-line-height-alt:14.399999999999999px;color:#555;line-height:1.2"><p style="margin:0;font-size:16px;text-align:center;mso-line-height-alt:19.2px"><strong><span style="font-size:28px;">${msgg}</span></strong></p></div></div></td></tr></table><table border="0" cellpadding="0" cellspacing="0" class="text_block block-4" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word" width="100%"><tr><td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px"><div style="font-family:sans-serif"><div class="" style="font-size:12px;font-family:Montserrat,Trebuchet MS,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Tahoma,sans-serif;mso-line-height-alt:18px;color:#555;line-height:1.5"><p style="margin:0;font-size:14px;text-align:center;mso-line-height-alt:30px">
<span style="color:#808389;font-size:20px;">---- ${verif_code} ----</span></p></div></div></td></tr></table><table border="0" cellpadding="0" cellspacing="0" class="divider_block block-5" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0" width="100%"><tr><td class="pad" style="padding-bottom:12px;padding-top:60px"><div align="center" class="alignment"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0" width="100%"><tr>
<td class="divider_inner" style="font-size:1px;line-height:1px;border-top:0 solid #bbb"><span> </span></td></tr></table></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0" width="100%"><tbody><tr><td><table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;color:#000;background-color:#410125;width:640px" width="640"><tbody><tr><td class="column column-1" style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-align:top;padding-top:0;padding-bottom:0;border-top:0;border-right:0;border-bottom:0;border-left:0" width="100%"><table border="0" cellpadding="0" cellspacing="0" class="text_block block-1" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word" width="100%"><tr><td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px"><div style="font-family:sans-serif"><div class="" style="font-size:12px;font-family:Montserrat,Trebuchet MS,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Tahoma,sans-serif;mso-line-height-alt:18px;color:#555;line-height:1.5"><p style="margin:0;font-size:14px;text-align:center;mso-line-height-alt:33px">
<span style="font-size:22px;color:#e6e6e6;"><strong><span style="">${name}</span></strong></span></p></div></div></td></tr></table><table border="0" cellpadding="0" cellspacing="0" class="divider_block block-2" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0" width="100%"><tr><td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:25px"><div align="center" class="alignment"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0" width="100%"><tr><td class="divider_inner" style="font-size:1px;line-height:1px;border-top:1px solid #555961"><span> </span></td></tr></table></div></td></tr></table><table border="0" cellpadding="0" cellspacing="0" class="text_block block-3" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word" width="100%"><tr><td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px"><div style="font-family:sans-serif"><div class="" style="font-size:12px;font-family:Montserrat,Trebuchet MS,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Tahoma,sans-serif;mso-line-height-alt:18px;color:#555;line-height:1.5"><p style="margin:0;font-size:14px;text-align:center;mso-line-height-alt:30px"><span style="font-size:20px;color:#cdc2cc;"><span style="">Arena clubs</span></span></p></div></div></td></tr></table></td>
</tr></tbody></table></td></tr></tbody></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-5" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0" width="100%"><tbody><tr><td><table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;color:#000;width:640px" width="640"><tbody><tr><td class="column column-1" style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-align:top;padding-top:5px;padding-bottom:5px;border-top:0;border-right:0;border-bottom:0;border-left:0" width="100%"><table border="0" cellpadding="0" cellspacing="0" class="icons_block block-1" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0" width="100%"><tr><td class="pad" style="vertical-align:middle;color:#9d9d9d;font-family:inherit;font-size:15px;padding-bottom:5px;padding-top:5px;text-align:center">
<table cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0" width="100%"><tr><td class="alignment" style="vertical-align:middle;text-align:center"><!--[if vml]><table align="left" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]--><!--[if !vml]><!--><table cellpadding="0" cellspacing="0" class="icons-inner" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;display:inline-block;margin-right:-4px;padding-left:0;padding-right:0"><!--<![endif]--><tr><td style="vertical-align:middle;text-align:center;padding-top:5px;padding-bottom:5px;padding-left:5px;padding-right:6px"><a href="https://www.designedwithbee.com/" style="text-decoration: none;" target="_blank"></table></td></tr></tbody></table><!-- End --></body></html>
        `
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
         //   res.send({"error" : error})
        } else {
            console.log('Email sent: ' + info.response);
          //  res.send({"ok" : info.response})

        }
    });
}

exports.emailexist  =  async(requete , reponse)=>{

    const exist_user = await UtilisateurModel.findOne({ email: requete.body.email , active:true})
    const exist_club = await ClubModel.findOne({ email: requete.body.email , active:true})
    if (exist_user || exist_club) {
        reponse.send({ msg:"exist",type: 'info' })
        const verif_code1 = ( Math.floor(Math.random()*(999999-100000) +100000 ) ).toString()
        if(exist_user){
        exist_user.verif_code = verif_code1
        await exist_user.save();
        sendCodeVerification(exist_user.email , verif_code1,exist_user.nom,"Reset password")}

        else{
            exist_club.verif_code = verif_code1
            await exist_club.save();
            sendCodeVerification(exist_club.email , verif_code1,exist_club.nom,"Reset password")}       

    } else {
        reponse.send({ msg: "Email not exist" , type:'error'})
    }
}




exports.savepassword  =  async(requete , reponse)=>{

    const user = await UtilisateurModel.findOne({ email: requete.body.email})
    const club = await ClubModel.findOne({ email: requete.body.email})

    if (user || club) {
        if ( user ) {
        if( (user.verif_code == requete.body.verif_code) && (requete.body.password1 == requete.body.password2) )
        {
            user.validation = true;
            user.mot_de_passe = requete.body.password1;
            await user.save()
            reponse.send({ msg:"password save",type:'success'}) 
        }else{
            reponse.send({ msg:"error",type:'error'})
        } }
        else{
            if( (club.verif_code == requete.body.verif_code) && (requete.body.password1 == requete.body.password2) )
            {
                club.validation = true;
                club.mot_de_passe = requete.body.password1;
                await club.save()
                reponse.send({ msg:"password save",type:'success'}) 
            }else{
                reponse.send({ msg:"error",type:'error'})
            }
        }

    } else {
        reponse.send({ msg: "error" , type:'error'})
    }
}



exports.changepassword  =  async(requete , reponse)=>{

    const user = await UtilisateurModel.findOne({ email: requete.body.email})
    const club = await ClubModel.findOne({ email: requete.body.email})
    if (user || club) {
        if ( user ) {
        if( (user.mot_de_passe == requete.body.password) && (requete.body.password1 == requete.body.password2) )
        {
            user.mot_de_passe = requete.body.password1;
            await user.save()
            reponse.send({ msg:"password save",type:'success'}) 
        }else{
            reponse.send({ msg:"check your password",type:'info'})
        } }
        else {
            if( (club.mot_de_passe == requete.body.password) && (requete.body.password1 == requete.body.password2) )
            {
                club.mot_de_passe = requete.body.password1;
                await club.save()
                reponse.send({ msg:"password save",type:'success'}) 
            }else{
                reponse.send({ msg:"check your password",type:'info'})
            } }

    } else {
        reponse.send({ msg: "error" , type:'error'})
    }
}




exports.getprofil  =  async(requete , reponse)=>{

    const Profil = await ProfilModel.findOne({ email: requete.body.email })

    if (Profil) {
        reponse.send({ res: Profil})
    }
}


exports.changelinks =  async(requete , reponse)=>{

    const Profil = await ProfilModel.findOne({ email: requete.body.email })
    if (Profil) {

        Profil.instagram=requete.body.instagram
        Profil.facebook=requete.body.facebook
        Profil.twitter=requete.body.twitter
        if(requete.body.linkedin){Profil.linkedin=requete.body.linkedin}
        await Profil.save();
        reponse.send({type:'success'})
    } else {
        reponse.send({ msg: "error" , type:'error'})
    }
}




exports.recherche_user=  async(requete , reponse)=>{
    const user = await UtilisateurModel.find( { nom: requete.body.nom  } )
    const user_email = await UtilisateurModel.find( { email_contact: requete.body.nom , email_partnership: true } )
    const user_tele = await UtilisateurModel.find( { tele: requete.body.nom , tele_partnership: true } )

    const club = await ClubModel.find( { nom: requete.body.nom  } ) 
    const club_ville = await ClubModel.find( { ville: requete.body.nom  } ) 
    const club_signe = await ClubModel.find( { signe: requete.body.nom  } ) 
    const club_email_contact = await ClubModel.find( { email_contact: requete.body.nom  } ) 
    const club_nom_universite = await ClubModel.find( { nom_universite: requete.body.nom  } ) 

    
    let i = 0
    let tab=[]
    for await(let c of club){
        tab[i]=c; i++
    }
    for await(let c of club_signe){
        tab[i]=c; i++
    }
    for await(let c of club_email_contact){
        tab[i]=c; i++
    }
    for await(let c of club_nom_universite){
        tab[i]=c; i++
    }
    for await(let c of club_ville){
        tab[i]=c; i++
    }
    


    for await(let u of user){
        tab[i]=u; i++
    }
    for await(let u of user_email){
        tab[i]=u; i++
    }
    for await(let u of user_tele){
        tab[i]=u; i++
    }



    if (tab.length > 0) {
        reponse.send({ res:tab})
    } 
    else{
        reponse.send({ res:'not found'})
    }
    } 



    exports.modify_contact_user=  async(requete , reponse)=>{
        const user = await UtilisateurModel.findOne({ email: requete.body.email })
            if (user) {
                user.tele=requete.body.tele;
                user.email_contact=requete.body.email_contact;
                await user.save();           
            } 
    }

    
    exports.modify_basic_info_user=  async(requete , reponse)=>{
        const user = await UtilisateurModel.findOne({ email: requete.body.email })
            if (user) {
                user.anniversaire=requete.body.anniversaire;
                user.ville=requete.body.ville;
                await user.save();           
            } 
    }

    

    exports.change_anniversaire_partnership=  async(requete , reponse)=>{
        const user = await UtilisateurModel.findOne({ email: requete.body.email })
            if (user) {
                user.anniversaire_partnership = !user.anniversaire_partnership;
                await user.save();           
            } 
    }

    exports.change_ville_partnership=  async(requete , reponse)=>{
        const user = await UtilisateurModel.findOne({ email: requete.body.email })
            if (user) {
                user.ville_partnership = !user.ville_partnership;
                await user.save();           
            } 
    }

    exports.change_tele_partnership=  async(requete , reponse)=>{
        const user = await UtilisateurModel.findOne({ email: requete.body.email })
            if (user) {
                user.tele_partnership = !user.tele_partnership;
                await user.save();           
            } 
    }

    exports.change_email_partnership=  async(requete , reponse)=>{
        const user = await UtilisateurModel.findOne({ email: requete.body.email })
            if (user) {
                user.email_partnership = !user.email_partnership;
                await user.save();           
            } 
    }


    exports.get_work  =  async(requete , reponse)=>{

        const result = await membreModel.find({ email_user: requete.body.email})
        reponse.send(result.reverse()) 

    }





    exports.adduniversity =  async (requete, reponse) => {

        const u = new universityModel(requete.body)
        await u.save();         
        reponse.send('u') 

}


exports.deluniversity =  async (requete, reponse) => {

    const raq = await universityModel.deleteOne({  email: requete.body.email , university : requete.body.university   })

    reponse.send('u') 

}


exports.getuniversity  =  async(requete , reponse)=>{

    const result = await universityModel.find({ email: requete.body.email})   
    reponse.send(result.reverse())

}







        exports.getuser  =  async(requete , reponse)=>{

            const user = await UtilisateurModel.findOne({ email: requete.body.email })
            if (user) {
                reponse.send({ user: user})
            } 
            else{
                reponse.send({ user: "null"})
            }
        }


    exports.getall=  async(requete , reponse)=>{

        const result = await UtilisateurModel.find()
        reponse.send(result)
    }








    
    // khatia hedhi 9dima // 
    exports.recherche=  async(requete , reponse)=>{

        const user = await UtilisateurModel.findOne({name: requete.body.name,tag: requete.body.tag})
        if (user) {
            if(user.validation == 1)
            {reponse.send({  email :  user.email })}
            else{reponse.send({ type:'error'})}
        } 
        else{
            reponse.send({ type:'error'})
        }
        }
        
    




    