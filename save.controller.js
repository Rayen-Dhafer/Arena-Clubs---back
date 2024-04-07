const saveModel = require("./save.model");
const imageModel = require("./Image.model");


exports.add_save =  async (requete, reponse) => {

    const exist_save = await saveModel.findOne({ email_saved: requete.body.email_saved , id_post_saved :requete.body.id_post_saved })
    if (exist_save ) {

        reponse.send({ msg: "exist" })     
    } 
    else{
        const s = new saveModel(requete.body)
        await s.save();
        reponse.send({ msg: "add" })    
    }
}

exports.delete_save =  async (requete, reponse) => {

    const exist_save = await saveModel.deleteOne({ id_post_saved : requete.body.id_post_saved , email_saved: requete.body.email_saved })
        reponse.send({ msg: "delete" })     

}

exports.get_save =  async (requete, reponse) => {

    const all_save = await saveModel.find({ email_saved: requete.body.email_saved  })
    if (all_save ) {


        let i = 0
        let save=[]
        for await(let s of all_save){
            const result = await imageModel.findById( s.id_post_saved )
            save[i]=result; i++
        }
        reponse.send({ msg: "success" , saves:save.reverse() })     
    } 
    else{

        reponse.send({ msg: "vide" })    
    }
}