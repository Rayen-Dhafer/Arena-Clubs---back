const report_account = require("./Report_account.model");
const report_post = require("./Report_post.model");
const imageModel = require("./Image.model");
const UtilisateurModel = require("./Utilisateur.model");
const ClubModel = require("./club.model");


exports.report_account =  async (requete, reponse) => {

    try{
        const report_a = new report_account(requete.body)
        report_a.vu=false
        await report_a.save(); 
        reponse.send({ msg: "success" })
    }
    catch{
        reponse.send({ msg: "error" })
    }

}

exports.report_post =  async (requete, reponse) => {

    try{
        const report_p = new report_post(requete.body)
        report_p.vu=false
        await report_p.save(); 
        reponse.send({ msg: "success" })
    }
    catch{
        reponse.send({ msg: "error" })
    }

}










exports.get_report_account =  async (requete, reponse) => {

        const result = await report_account.find()
        reponse.send({ reports: result.reverse() })

}

exports.get_report_post =  async (requete, reponse) => {

    const result = await report_post.find()
    reponse.send({ reports: result.reverse() })

}











exports.get_report_img =  async (requete, reponse) => {

    const result = await imageModel.findOne({image : requete.body.image})
    reponse.send({ img: result })

}






exports.get_report_acc =  async (requete, reponse) => {

    const resultc = await ClubModel.findOne({email : requete.body.email})
    if(resultc){
        reponse.send({ acc: resultc })
    }
    else{
        const result = await UtilisateurModel.findOne({email : requete.body.email})
        reponse.send({ acc: result })
    }
    

}







exports.vu_report_post =  async(requete , reponse)=>{

    const result = await report_post.findOne({_id : requete.body.id })
    result.vu=true
        await result.save();
        reponse.send({type:'success'})

}




exports.vu_report_acc =  async(requete , reponse)=>{

    const result = await report_account.findOne({_id : requete.body.id })
    result.vu=true
        await result.save();
        reponse.send({type:'success'})

}






exports.del_report_post =  async (requete, reponse) => {

    const result = await imageModel.deleteOne({image : requete.body.image})
    const result2 = await report_post.remove({report_post : requete.body.image})

    reponse.send({ s: "s" })
}



exports.dis_report_acc =  async (requete, reponse) => {

    const resultc = await ClubModel.findOne({email : requete.body.email})
    if(resultc){
        resultc.active=false
        await resultc.save();
    }
    else{
        const result = await UtilisateurModel.findOne({email : requete.body.email})
        result.active=false
        await result.save();
    }
    const result2 = await report_account.remove({report_account : requete.body.email})

    reponse.send({ s: "s" })
}


exports.get_disabled=  async (requete, reponse) => {

    const resultc = await ClubModel.find({active : false})
    reponse.send({ disabled: resultc }) 

}


exports.enable_acc =  async(requete , reponse)=>{

    const resultc = await ClubModel.findOne({_id : requete.body.id })
    if(resultc){
        resultc.active=true
        await resultc.save();
        console.log(resultc) 
        console.log(requete.body)
    }
    else{
        const result = await UtilisateurModel.findOne({_id : requete.body.id })
        result.active=true
        await result.save();
    }
    reponse.send({ s: "s" })
}