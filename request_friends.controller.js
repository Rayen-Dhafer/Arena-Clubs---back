const requestModel = require("./Request_friends.model");
const friendsModel = require("./friends.model");
const UtilisateurModel = require("./Utilisateur.model");
const ClubModel = require("./club.model");
const followModel = require("./Follow.model");
const membreModel = require("./membre.model");
const requestModel_c = require("./Request.model");
const conversationModel = require("./conversation.model");



exports.addrequest_friend =  async (requete, reponse) => {

        const request = new requestModel(requete.body)
        await request.save();     
        reponse.send({s:"s"})     
          
}
exports.get_request_friend =  async (requete, reponse) => {

    const result = await requestModel.find({ email_to: requete.body.email})
    reponse.send(result) 
      
}


exports.delete_request_friend =  async (requete, reponse) => {

    const raq = await requestModel.deleteOne({ email_to : requete.body.email_to , email_user : requete.body.email_user   })
    reponse.send({s:"s"})   
}

exports.add_request_friend  =  async (requete, reponse) => {
    const friend = new friendsModel(requete.body)
    await friend.save();   
    const raq = await requestModel.deleteOne({ $or:[{email_to : requete.body.email_user_1 , email_user :requete.body.email_user_2 },{email_to :requete.body.email_user_2 , email_user :requete.body.email_user_1}]  })
  
    const onversation = new conversationModel()
        
    onversation.name_user_1 = requete.body.name_user_1
    onversation.email_user_1 = requete.body.email_user_1
    onversation.image_user_1 = requete.body.image_user_1

    onversation.name_user_2 = requete.body.name_user_2
    onversation.email_user_2 = requete.body.email_user_2
    onversation.image_user_2 = requete.body.image_user_2
    onversation.vu = true
    onversation.last_msg = 'null'

    await onversation.save();

    reponse.send({s:"s"})   
}

exports.get__friend =  async (requete, reponse) => {

    const result = await friendsModel.find({  $or:[{ email_user_1 : requete.body.email },{ email_user_2 : requete.body.email }]  })
    reponse.send(result) 
      
}


exports.delete_friend =  async (requete, reponse) => {
    const raq = await friendsModel.deleteOne({ $or:[{email_user_1 : requete.body.email_user_1 , email_user_2 :requete.body.email_user_2 },{email_user_1 :requete.body.email_user_2 , email_user_2 :requete.body.email_user_1}]  })
    const raq1 = await conversationModel.deleteOne({ $or:[{email_user_1 : requete.body.email_user_1 , email_user_2 :requete.body.email_user_2 },{email_user_1 :requete.body.email_user_2 , email_user_2 :requete.body.email_user_1}]  })

    reponse.send({s:requete.body})   
}


exports.profil_btn_user =  async (requete, reponse) => {

    
    const exist_club = await ClubModel.findOne({ email: requete.body.email_2 })
    let type_f ="" ; let type_m =""

    if(exist_club){

        const membre = await membreModel.findOne({ email_club: requete.body.email_2 , email_user : requete.body.email_me , date:requete.body.date})
        const follow = await followModel.findOne({ email_followed : requete.body.email_2 , email_follow : requete.body.email_me   })
        if(follow){ type_f = "following"}else{type_f = "follow" }
        if(membre){ type_m = "membre"}else{
            const can_req = await requestModel_c.findOne({ email_club : requete.body.email_2 , email_user : requete.body.email_me   })
            if(can_req){ type_m = "cancel_request"}else{type_m = "join_request" }
            
        }
        reponse.send({ type_f:type_f, type_m:type_m}) 

    }else{
    const amis = await friendsModel.findOne({ $or:[{email_user_1 : requete.body.email_me , email_user_2 :requete.body.email_2 },{email_user_1 :requete.body.email_2 , email_user_2 :requete.body.email_me}]  })
    if(amis)
    {
        reponse.send({type:"amis"}) 
    }
    else{
        const can_req = await requestModel.findOne({ email_to : requete.body.email_2 , email_user : requete.body.email_me   })
        if(can_req)
        {
            reponse.send({type:"can_req"}) 
        }
        else{
            const acc_req = await requestModel.findOne({ email_to : requete.body.email_me , email_user : requete.body.email_2   })
            if(acc_req)
            {
                reponse.send({type:"acc_req"}) 
            }
            else{
                reponse.send({type:"add_amis"}) 
            }
        }
    }
    }
} 



exports.profil_btn_club =  async (requete, reponse) => {
    let type_f ="null" ; let type_m ="null"
    const membre = await membreModel.findOne({ email_club: requete.body.email_me , email_user : requete.body.email_2 , date:requete.body.date})
    const follow = await followModel.findOne({ email_followed : requete.body.email_me , email_follow : requete.body.email_2   })
    if(follow){ type_f = "following"}
    if(membre){ type_m = "membre"}else{
        const can_req = await requestModel_c.findOne({ email_club : requete.body.email_me , email_user : requete.body.email_2   })
        if(can_req){ type_m = "ac_request"}
        
    }
    reponse.send({ type_f:type_f, type_m:type_m}) 

}