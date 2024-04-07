const followModel = require("./Follow.model");
const messagesModel = require("./messages.model");
const conversationModel = require("./conversation.model");
const UtilisateurModel = require("./Utilisateur.model");
const ClubModel = require("./club.model");
const membreModel = require("./membre.model");


exports.get_list = async  (requete, reponse) => {

    const follow_1 =  await followModel.find({  email_follow : requete.body.email         })
    const follow_2 =  await followModel.find({  email_followed : requete.body.email       })

    let friends=[]
    let followers=[]
    let following=[]
    let friends_indx=0; let following_indx=0; let followers_indx=0

    for await(let f1 of follow_1){
        let i=0
        for(let f2 of follow_2){
            if( f1.email_followed == f2.email_follow){ friends[friends_indx]=f1; friends_indx++; break }
            i++
        }
    }


    for await(let f1 of follow_1){
        let i=0
        let tst=0
        for(let f2 of friends){
            if( f1.email_followed == f2.email_followed){ tst=1; break }
            i++
        }
        if( tst == 0 ){ following[following_indx]=f1; following_indx++}
    }


    for await(let f1 of follow_2){
        let i=0
        let tst=0;
        for(let f2 of friends){
            if( f1.email_follow == f2.email_followed){ tst=1; break }
            i++
        }
        if( tst == 0 ){ followers[followers_indx]=f1; followers_indx++ }
    }

    reponse.send({ friends: friends , followers:followers , following: following})     
}







exports.get_messages = async  (requete, reponse) => {

    const messages =  await messagesModel.find({ $or:[{email_send : requete.body.email_1 , email_to :requete.body.email_2 },{email_send :requete.body.email_2 , email_to :requete.body.email_1}]   })
    reponse.send({ messages: messages })  
}


exports.get_messages_groub = async  (requete, reponse) => {

    const messages =  await messagesModel.find({ email_to :requete.body.email  })
    reponse.send({ messages: messages })  
}














exports.send_message = async  (requete, reponse) => {

    const message = new messagesModel(requete.body)

        const club = await ClubModel.findOne({ email: requete.body.email_send })
        if (club) {
            message.img_send=club.image
        } 
        else{
            const user = await UtilisateurModel.findOne({ email: requete.body.email_send })
            message.img_send=user.image
        }
    
    await message.save();
    const conv = await conversationModel.findOne({ $or:[{email_user_1 : requete.body.email_send , email_user_2 :requete.body.email_to },{email_user_1 :requete.body.email_to , email_user_2 :requete.body.email_send}]  })
    if(conv.last_msg != requete.body.email_send)
    {
        conv.last_msg = requete.body.email_send
    }
    conv.vu = false
    await conv.save();

}



exports.send_message_groub = async  (requete, reponse) => {

    const message = new messagesModel(requete.body)

            const user = await UtilisateurModel.findOne({ email: requete.body.email_send })
            message.img_send=user.image
        
    await message.save();

}

