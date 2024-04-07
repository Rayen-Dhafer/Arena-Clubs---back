
const conversationModel = require("./conversation.model");
const membreModel = require("./membre.model");






exports.get_conversation =  async (requete, reponse) => {


    
    const result1 = await conversationModel.find({  $or:[{ email_user_1 : requete.body.email },{ email_user_2 : requete.body.email }] , last_msg: {$nin : [requete.body.email, "null"]} , vu:false })
    const result2 = await conversationModel.find({  $or:[{ email_user_1 : requete.body.email },{ email_user_2 : requete.body.email }] , last_msg: {$nin : [requete.body.email, "null"]} , vu:true })
    
    const result3 = await conversationModel.find({  $or:[{ email_user_1 : requete.body.email },{ email_user_2 : requete.body.email }] , last_msg: requete.body.email  })

    const result4 = await conversationModel.find({  $or:[{ email_user_1 : requete.body.email },{ email_user_2 : requete.body.email }] , last_msg:"null" })


    let i = 0
    let tab=[]
    for await(let c of result1){
        tab[i]=c; i++
    }
    for await(let c of result2){
        tab[i]=c; i++
    }
    for await(let c of result3){
        tab[i]=c; i++
    }
    for await(let c of result4){
        tab[i]=c; i++
    }


    reponse.send({ res:tab})
      
}






exports.vu_conversation = async  (requete, reponse) => {

    const conv = await conversationModel.findOne({ $or:[{email_user_1 : requete.body.email_user_1 , email_user_2 :requete.body.email_user_2 },{email_user_1 :requete.body.email_user_2 , email_user_2 :requete.body.email_user_1}]  })
        if(conv){
            conv.vu = true
            await conv.save();
        }

        reponse.send({ res:"s"})
     
}






exports.get_groubs_conversation =  async(requete , reponse)=>{

    const result = await membreModel.find({ email_user: requete.body.email , date: requete.body.date})
    reponse.send( {res:result.reverse()} ) 

}



exports.get_nb_msg_non_vu =  async(requete , reponse)=>{

    const result1 = await conversationModel.find({  $or:[{ email_user_1 : requete.body.email },{ email_user_2 : requete.body.email }] ,  last_msg: { $nin: [ "null", requete.body.email ] }  , vu:false    })

    reponse.send( {nb:result1.length} ) 

}