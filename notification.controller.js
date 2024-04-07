const notificationModel = require("./Notification.model");

exports.addnotification =  async (requete, reponse) => {

    try{
        const notification = new notificationModel(requete.body)
        notification.vu=false
        await notification.save(); 
        reponse.send({ msg: "notification" })
    }
    catch{
        reponse.send({ msg: "notification" })
    }

}

exports.deletenotification_like =  async (requete, reponse) => {
    try{
    const notification = await notificationModel.deleteOne({ email_do : requete.body.email_do , email_to : requete.body.email_to,img_do:requete.body.img_do ,msg:requete.body.msg  })
    reponse.send({ msg: "notification" })
}
    catch{
        reponse.send({ msg: "notification" })
    }
}

exports.deletenotification_follow =  async (requete, reponse) => {

    const notification = await notificationModel.deleteOne({ email_do : requete.body.email_do , email_to : requete.body.email_to,msg:"started following you"   })

}

exports.getnotification =  async (requete, reponse) => {

    const notification = await notificationModel.find({  email_to : requete.body.email  })
    reponse.send({ notification: notification.reverse()})

}



exports.getnotification_vu =  async (requete, reponse) => {

    const notificationvu = await notificationModel.find({  email_to : requete.body.email,vu:false  })
    reponse.send({  nbr_vu:notificationvu.length})

}


exports.vu_notification =  async (requete, reponse) => {

    const notification = await notificationModel.find({  email_to : requete.body.email,vu:false  })

    for(let n of notification)
    {
        const notification2 = await notificationModel.findOne({  _id : n._id  })
        notification2.vu=true
        await notification2.save();
    }


}