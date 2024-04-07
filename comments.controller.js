const commenter = require("./Comments.model");

exports.add_commenter =  async (requete, reponse) => {

    try{
        const com = new commenter(requete.body)
        await com.save(); 
        reponse.send({ msg: "yes" })
    }
    catch{
        reponse.send({ msg: "no" })
    }

}

exports.get_commenters =  async (requete, reponse) => {

        const com = await commenter.find({ email_img: requete.body.email_img, image: requete.body.image, group_name: requete.body.group_name  })
        if(com){    reponse.send({ commenters: com})   }
         else(reponse.send({ msg: "no" }))

}


exports.del_commenter =  async (requete, reponse) => {

    const com = await commenter.deleteOne({ _id: requete.body.id  })
    if(com){
        reponse.send({ msg: "yes" })
    }

}


exports.edit_comment =  async (requete, reponse) => {

    const com = await commenter.findOne({ _id: requete.body.id  })
    if(com){  
    com.comment=requete.body.comment   
    await com.save();
    reponse.send({ msg: "yes"})   }
    else(reponse.send({ msg: "no" }))

}
