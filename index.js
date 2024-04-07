//express : création des apis 
//mongoose : biblio base de donnees mongodb
//cors : autorisation de la consomation des apis

//nodemon

// node-mailer : envoie des email
//connect-multiparty : upload des images


const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const multiparty = require('connect-multiparty')
const multipartyMiddleware = multiparty({uploadDir: './uploads'})

var serveur = express()
serveur.use(cors())
serveur.use(express.json()) 
serveur.use(express.static('./')) 

mongoose.connect("mongodb://localhost:27017/arena_clubs_db", () => {
    console.log('Siuuuuuuuuuu')
})

const profilCtrl = require('./profil.controller')
const imageCtrl = require('./image.controller')
const likeCtrl = require('./like.controller')
const followCtrl = require('./follow.controller')
const notificationCtrl = require('./notification.controller')
const commentCtrl = require('./comments.controller')
const messagesCtrl = require('./messages.controller')
const languageCtrl = require('./language.controller')
const reportCtrl = require('./report.controller')

const groupCtrl = require('./group.controller')
const userCtrl = require('./utilisateurs.controller')
const clubCtrl = require('./clubs.controller')
const requestCtrl = require('./request.controller')
const request_fCtrl = require('./request_friends.controller')
const saveCtrl = require('./save.controller')
const conCtrl = require('./conversation.controller')


serveur.post('/get_conversation', conCtrl.get_conversation)
serveur.post('/vu_conversation', conCtrl.vu_conversation)
serveur.post('/get_groubs_conversation', conCtrl.get_groubs_conversation)
serveur.post('/get_nb_msg_non_vu', conCtrl.get_nb_msg_non_vu)



serveur.post('/add_save', saveCtrl.add_save)
serveur.post('/get_save', saveCtrl.get_save)
serveur.post('/delete_save', saveCtrl.delete_save)
 
serveur.post('/addrequest_friend', request_fCtrl.addrequest_friend)
serveur.post('/get_request_friend', request_fCtrl.get_request_friend)
serveur.post('/delete_request_friend', request_fCtrl.delete_request_friend)
serveur.post('/add_request_friend', request_fCtrl.add_request_friend)
serveur.post('/get__friend', request_fCtrl.get__friend)
serveur.post('/delete_friend', request_fCtrl.delete_friend)
serveur.post('/profil_btn_user', request_fCtrl.profil_btn_user)
serveur.post('/profil_btn_club', request_fCtrl.profil_btn_club)

serveur.post('/get_membres_club', requestCtrl.get_membres_club)
serveur.post('/addrequest', requestCtrl.addrequest)
serveur.post('/delete_membre', requestCtrl.delete_membre)
serveur.post('/get_request_club', requestCtrl.get_request_club)
serveur.post('/delete_request', requestCtrl.delete_request)
serveur.post('/add_request', requestCtrl.add_request)
serveur.post('/modify_role', requestCtrl.modify_role)

serveur.post('/inscription_utilisateur', userCtrl.inscription)
serveur.post('/inscription_club', clubCtrl.inscription)
serveur.post('/validate' , userCtrl.validate)
serveur.post('/login' , userCtrl.login)
serveur.post('/emailexist' , userCtrl.emailexist)
serveur.post('/changepassword' , userCtrl.changepassword)
serveur.post('/savepassword' , userCtrl.savepassword)
serveur.post('/changename' , userCtrl.changename)
serveur.post('/modify_contact_user' , userCtrl.modify_contact_user)
serveur.post('/modify_basic_info_user' , userCtrl.modify_basic_info_user)
serveur.post('/change_anniversaire_partnership' , userCtrl.change_anniversaire_partnership)
serveur.post('/change_ville_partnership' , userCtrl.change_ville_partnership)
serveur.post('/change_tele_partnership' , userCtrl.change_tele_partnership)
serveur.post('/change_email_partnership' , userCtrl.change_email_partnership)


serveur.post('/getclub' , clubCtrl.getclub)
serveur.post('/Upimage' , userCtrl.Upimage)
serveur.post('/getprofil' , userCtrl.getprofil)
serveur.post('/changelinks' , userCtrl.changelinks)
serveur.post('/Upcouverture' , clubCtrl.Upcouverture)
serveur.post('/modify_contact_club' , clubCtrl.modify_contact_club)
serveur.post('/recherche_club' , clubCtrl.recherche_club)
serveur.post('/recherche_user' , userCtrl.recherche_user)



serveur.post('/get_work' , userCtrl.get_work)
serveur.post('/getuser' , userCtrl.getuser)
serveur.get('/getall' , userCtrl.getall)
serveur.post('/recherche' , userCtrl.recherche)
serveur.post('/adduniversity' , userCtrl.adduniversity)
serveur.post('/deluniversity' , userCtrl.deluniversity)
serveur.post('/getuniversity' , userCtrl.getuniversity)

serveur.post('/changetest' , profilCtrl.changetest)
serveur.post('/modify' , profilCtrl.modify)
serveur.post('/modify_bio' , profilCtrl.modify_bio)



serveur.post('/creategroup' , groupCtrl.creategroup)
serveur.post('/getallgroup' , groupCtrl.getallgroup)
serveur.post('/editalbum' , groupCtrl.editalbum)
serveur.post('/deletealbum' , groupCtrl.deletealbum)

serveur.post('/addimage' , imageCtrl.addimage)
serveur.post('/getallimages' , imageCtrl.getallimages)
serveur.post('/deleteimage' , imageCtrl.deleteimage)
serveur.post('/editstatu' , imageCtrl.editstatu)
serveur.post('/getallimages_following' , imageCtrl.getallimages_following)

serveur.post('/addlike' , likeCtrl.addlike)
serveur.post('/deletelike' , likeCtrl.deletelike)
serveur.post('/testlike' , likeCtrl.testlike)
serveur.post('/getall_like' , likeCtrl.getall_like)
serveur.post('/getall_like_home' , likeCtrl.getall_like_home)
 
serveur.post('/addfollow' , followCtrl.addfollow)
serveur.post('/deletefollow' , followCtrl.deletefollow)
serveur.post('/testfollow' , followCtrl.testfollow)
serveur.post('/getallfollowers' , followCtrl.getallfollowers)
serveur.post('/getallfollowing' , followCtrl.getallfollowing)

serveur.post('/addnotification' , notificationCtrl.addnotification)
serveur.post('/deletenotification_like' , notificationCtrl.deletenotification_like)
serveur.post('/deletenotification_follow' , notificationCtrl.deletenotification_follow)
serveur.post('/getnotification' , notificationCtrl.getnotification)
serveur.post('/vu_notification' , notificationCtrl.vu_notification)
serveur.post('/getnotification_vu' , notificationCtrl.getnotification_vu)

serveur.post('/add_commenter' , commentCtrl.add_commenter)
serveur.post('/get_commenters' , commentCtrl.get_commenters)
serveur.post('/del_commenter' , commentCtrl.del_commenter)
serveur.post('/edit_comment' , commentCtrl.edit_comment)

serveur.post('/get_list' , messagesCtrl.get_list)
serveur.post('/send_message' , messagesCtrl.send_message)
serveur.post('/send_message_groub' , messagesCtrl.send_message_groub)
serveur.post('/get_messages' , messagesCtrl.get_messages)
serveur.post('/get_messages_groub' , messagesCtrl.get_messages_groub)

serveur.post('/report_account' , reportCtrl.report_account)
serveur.post('/report_post' , reportCtrl.report_post)
serveur.post('/get_report_account' , reportCtrl.get_report_account)
serveur.post('/get_report_post' , reportCtrl.get_report_post)
serveur.post('/get_report_img' , reportCtrl.get_report_img)
serveur.post('/vu_report_post' , reportCtrl.vu_report_post)
serveur.post('/del_report_post' , reportCtrl.del_report_post)
serveur.post('/get_report_acc' , reportCtrl.get_report_acc)
serveur.post('/vu_report_acc' , reportCtrl.vu_report_acc)
serveur.post('/dis_report_acc' , reportCtrl.dis_report_acc)
serveur.post('/get_disabled' , reportCtrl.get_disabled)
serveur.post('/enable_acc' , reportCtrl.enable_acc)




serveur.post('/get_language' , languageCtrl.get_language)






serveur.post('/upload' , multipartyMiddleware , (requete , reponse)=>{
    var file = requete.files
    reponse.send(file)

})

serveur.listen(3000, () => {
    console.log('server runnn')
})