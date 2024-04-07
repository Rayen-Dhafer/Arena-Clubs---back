const GroupModel = require("./Group.model");
const UtilisateurModel = require("./Utilisateur.model");
const ProfilModel = require("./Profil.model");
const imageModel = require("./Image.model");
const likeModel = require("./Like.model");
const followModel = require("./Follow.model");
const conversationModel = require("./conversation.model");

exports.addfollow =  async (requete, reponse) => {

        const follow = new followModel(requete.body)
        await follow.save();         
        const onversation = new conversationModel()
        
        onversation.name_user_1 = requete.body.name_follow
        onversation.email_user_1 = requete.body.email_follow
        onversation.image_user_1 = requete.body.img_follow
    
        onversation.name_user_2 = requete.body.name_followed
        onversation.email_user_2 = requete.body.email_followed
        onversation.image_user_2 = requete.body.img_followed
        onversation.vu = true
        onversation.last_msg = 'null'

        await onversation.save();
        reponse.send({s:"s"})  
}

exports.deletefollow =  async (requete, reponse) => {

    const follow = await followModel.deleteOne({ email_followed : requete.body.email_followed , email_follow : requete.body.email_follow   })
    const raq = await conversationModel.deleteOne({ $or:[{email_user_1 : requete.body.email_followed , email_user_2 :requete.body.email_follow },{email_user_1 :requete.body.email_follow , email_user_2 :requete.body.email_followed}]  })
    reponse.send({s:"s"})  
}




exports.testfollow =  async (requete, reponse) => {

    const follow = await followModel.findOne({ email_followed : requete.body.email_followed , email_follow : requete.body.email_follow   })
    if(follow){reponse.send({ test: 1})}
    else{reponse.send({ test: 0})}
}

exports.getallfollowers =  async (requete, reponse) => {
    const follows = await followModel.find({ email_followed : requete.body.email  })
    reponse.send(follows)
}

exports.getallfollowing =  async (requete, reponse) => {
    const follows = await followModel.find({ email_follow: requete.body.email  })
    reponse.send(follows)
}