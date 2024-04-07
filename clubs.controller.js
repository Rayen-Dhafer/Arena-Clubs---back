const UtilisateurModel = require("./Utilisateur.model");
const ClubModel = require("./club.model");
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt');





exports.inscription =  async (requete, reponse) => {

    const exist_email_user = await UtilisateurModel.findOne({ email: requete.body.email })
    const exist_email_club = await ClubModel.findOne({ email: requete.body.email })
    if (exist_email_club || exist_email_user ) {
        reponse.send({ msg: "Email already used"  , type:'error'})
    } else {
        const club = new ClubModel(requete.body)

            const verif_code = Math.floor(Math.random()*(999999-100000) +100000 )
            club.verif_code = verif_code

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(requete.body.mot_de_passe,salt);
            club.mot_de_passe=hash

            club.validation = false
            club.active = true
            club.couverture = "",

            await club.save();
            sendCodeVerification(requete.body.email , verif_code,requete.body.nom,"Verify your email")
            reponse.send({ msg: "Verification your email" , type:'info' })
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



exports.getclub  =  async(requete , reponse)=>{

    const club = await ClubModel.findOne({ email: requete.body.email })
    if (club) {
        reponse.send({ club: club})
    } 
    else{
        reponse.send({ club: "null"})
    }
}


exports.Upcouverture=  async(requete , reponse)=>{
    const club = await ClubModel.findOne({ email: requete.body.email })
    if (club) {
        club.couverture=requete.body.couverture;
        await club.save();
        reponse.send({ msg:"success"})
       
    } 
    }


exports.modify_contact_club=  async(requete , reponse)=>{
    const club = await ClubModel.findOne({ email: requete.body.email })
        if (club) {
            club.tele=requete.body.tele;
            club.email_contact=requete.body.email_contact;
            await club.save();           
        } 
}



exports.recherche_club=  async(requete , reponse)=>{
    const user = await UtilisateurModel.find( { nom: requete.body.nom  } )                        
    if (user.length > 0) {
        reponse.send({ res:user})
    } 
    else{
        reponse.send({ res:'not found'})
    }
    }   