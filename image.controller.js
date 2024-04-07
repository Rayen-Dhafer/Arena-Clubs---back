const GroupModel = require("./Group.model");
const UtilisateurModel = require("./Utilisateur.model");
const ProfilModel = require("./Profil.model");
const imageModel = require("./Image.model");
const likeModel = require("./Like.model");
const followModel = require("./Follow.model");

exports.addimage =  async (requete, reponse) => {

    const exist_group = await GroupModel.findOne({ email: requete.body.email , group_name :requete.body.group_name  })
    if (exist_group ) {
        const img = new imageModel(requete.body)
        await img.save();
        reponse.send({ msg: "image add with successfully" , type:'success'})     
    } 
    else{
        reponse.send({ msg: "error" , type:'error'})    
    }
}


exports.getallimages=  async(requete , reponse)=>{

    const result = await imageModel.find({ email: requete.body.email})
    reponse.send(result)
}

exports.deleteimage=  async(requete , reponse)=>{
    const img = await imageModel.deleteOne({ email: requete.body.email,group_name :requete.body.group_name ,image:requete.body.image }) 
    const user = await ProfilModel.findOne({ email: requete.body.email }) 
    const likes = await likeModel.remove({email_img: requete.body.email ,group_name:requete.body.group_name })
    user.nb_img=user.nb_img-1
    await user.save()


}

exports.editstatu=  async(requete , reponse)=>{

    const exist_img = await imageModel.findOne({ email: requete.body.email, group_name: requete.body.group_name,image:requete.body.image   } )
    exist_img.statu = requete.body.statu;
    await exist_img.save();

    }

    exports.getallimages_following=  async(requete , reponse)=>{

        let tab1=[]
        let i=0
        const follows = await followModel.find({ email_follow: requete.body.email  })
        for(let f of follows){
            const result = await imageModel.find({ email: f.email_followed  })
            tab1[i]=result
            i++
        }
        reponse.send(tab1)
    }