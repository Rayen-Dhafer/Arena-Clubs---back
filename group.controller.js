const GroupModel = require("./Group.model");
const UtilisateurModel = require("./Utilisateur.model");
const ProfilModel = require("./Profil.model");
const imageModel = require("./Image.model");
const likeModel = require("./Like.model");

exports.creategroup =  async (requete, reponse) => {
    console.log(requete.body)



        const exist_group = await GroupModel.findOne({ email: requete.body.email, group_name: requete.body.group_name  })
        if(exist_group){ reponse.send({ msg: "already used" , type:'error'}) }
        else{
        const user = new GroupModel(requete.body)
        await user.save();
        reponse.send({ msg: "create group" , type:'success'})
         }
    
}


exports.getallgroup=  async(requete , reponse)=>{

    const result = await GroupModel.find({ email: requete.body.email })
    reponse.send(result)
    
}


exports.editalbum=  async(requete , reponse)=>{

    const exist_group = await GroupModel.findOne({ email: requete.body.email, group_name: requete.body.group_name  })
    if(exist_group){
    exist_group.group_name = requete.body.group_name2;


    const exist_img = await imageModel.find({ email: requete.body.email, group_name: requete.body.group_name  } )
    exist_img.forEach( async (i)=> {i.group_name = requete.body.group_name2   
                      await i.save();} )
    
    const exist_like = await likeModel.find({ email_img: requete.body.email, group_name: requete.body.group_name  } )
    exist_like.forEach( async (i)=> {i.group_name = requete.body.group_name2   
                     await i.save();} )
  
    await exist_group.save();
    }
}
     
    exports.deletealbum=  async(requete , reponse)=>{
        const user = await ProfilModel.findOne({ email: requete.body.email }) 
        const img = await imageModel.find({ email: requete.body.email, group_name: requete.body.group_name  } )
            user.nb_classe=user.nb_classe-1
            user.nb_img=user.nb_img-img.length
            await user.save()
        const exist_group = await GroupModel.deleteOne({ email: requete.body.email, group_name: requete.body.group_name  })
        const exist_img = await imageModel.remove({ email: requete.body.email, group_name: requete.body.group_name  })
        const likes = await likeModel.remove({email_img: requete.body.email ,group_name:requete.body.group_name })


    }
    