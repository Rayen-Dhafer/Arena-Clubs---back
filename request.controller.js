const requestModel = require("./Request.model");
const membreModel = require("./membre.model");
const conversationModel = require("./conversation.model");

exports.addrequest =  async (requete, reponse) => {

        const request = new requestModel(requete.body)
        await request.save();     
        reponse.send({s:"s"})     
          
}
exports.get_request_club =  async (requete, reponse) => {

    const result = await requestModel.find({ email_club: requete.body.email})
    reponse.send(result) 
      
}


exports.delete_request =  async (requete, reponse) => {

    const raq = await requestModel.deleteOne({ email_club : requete.body.email_club , email_user : requete.body.email_user   })
    reponse.send({s:"s"})   
}

exports.add_request =  async (requete, reponse) => {
    const membre = new membreModel(requete.body)
    await membre.save();   
    const raq = await requestModel.deleteOne({ email_club : requete.body.email_club , email_user : requete.body.email_user   })
//g
    reponse.send({s:"s"})   
}

exports.get_membres_club =  async (requete, reponse) => {

    const result = await membreModel.find({ email_club: requete.body.email,date:requete.body.date})
    reponse.send(result) 
      
}


exports.delete_membre =  async (requete, reponse) => {
    const dm = await membreModel.deleteOne({ email_club : requete.body.email_club , email_user : requete.body.email_user, date:requete.body.date   })
    reponse.send({s:"s"})   
}


exports.modify_role =  async (requete, reponse) => {

    const membre = await membreModel.findOne({ email_club: requete.body.email_club , email_user: requete.body.email_user , date:requete.body.date  })
    if(membre){
        membre.role = requete.body.role;
    await membre.save();
    }

    reponse.send({s:"s"})   
}