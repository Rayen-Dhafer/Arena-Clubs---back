const GroupModel = require("./Group.model");
const UtilisateurModel = require("./Utilisateur.model");
const ProfilModel = require("./Profil.model");
const imageModel = require("./Image.model");
const likeModel = require("./Like.model");

exports.addlike =  async (requete, reponse) => {

    try{
        const img = await imageModel.findOne({ email: requete.body.email_img ,group_name:requete.body.group_name , image:requete.body.image })
       if(img){
        img.nb_like= img.nb_like+1
        await img.save();

        const like = new likeModel()
        like.email_like = requete.body.email_like ,
        like.email_img = requete.body.email_img ,
        like.group_name = requete.body.group_name,
        like.image = requete.body.image ,
                        
        await like.save();                 
       }
       reponse.send({ msg: "yep"})
    }
    catch{
        reponse.send({ msg: "errer"})
    }
       

    

}

exports.deletelike =  async (requete, reponse) => {

        const img = await imageModel.findOne({ email: requete.body.email_img ,group_name:requete.body.group_name , image:requete.body.image })
       if(img){
        img.nb_like= img.nb_like-1
        await img.save();

        const like = await likeModel.deleteOne({ email_img: requete.body.email_img ,email_like: requete.body.email_like,group_name:requete.body.group_name , image:requete.body.image })

       }

       reponse.send({ msg: "yep"})
    

}



exports.testlike =  async (requete, reponse) => {
    const user_like = await UtilisateurModel.findOne({ email: requete.body.email_like  })
    const user_img = await UtilisateurModel.findOne({ email: requete.body.email_img  })
    if (user_like &&  user_img) {
        const img = await imageModel.findOne({ email: requete.body.email_img ,group_name:requete.body.group_name , image:requete.body.image })
        if(img){
            const like = await likeModel.findOne({ email_img: requete.body.email_img ,email_like: requete.body.email_like,group_name:requete.body.group_name , image:requete.body.image })
            if(like){
                reponse.send({ test: 1})
            }
            else{
                reponse.send({ test: 0})
            }
        }

    }

}

exports.getall_like=  async(requete , reponse)=>{

    const result = await likeModel.find({ email_img: requete.body.email })
    reponse.send(result)
    
}

exports.getall_like_home=  async(requete , reponse)=>{

    const result = await likeModel.find()
    reponse.send(result)
    
}
