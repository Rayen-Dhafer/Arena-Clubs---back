const language= require("./language.model");


exports.get_language =  async (requete, reponse) => {

 
        const result = await language.findOne({language : requete.body.lang})

            reponse.send({ My_language: result })   


}




