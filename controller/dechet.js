const { Dechet } = require("../model/dechet")
const client = require("../bdd/connect");

const ajouterDechet = async (req, res)=>{
    try{
        let dechet = new Dechet(req.body.id_dechet, req.body.nom_dechet);

        let result = await client.db().collection("dechet").insertOne(dechet)

        res.status(200).json(result);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

}

const getTousDechet = async (req, res)=>{
try {
    let cursor = client.db().collection("dechet").find();
    let result = await cursor.toArray();
    if(result.length>0){
        res.status(200).json(result);
    }
    else{
        res.status(204).json({msg : "Aucun dechet trouvé"});
    }
    
} catch (error) {
    console.log(error);
    res.status(500).json(error);
}
}

const getDechet = async (req, res)=>{
    try {
        let id = new ObjectID(req.params.id);
        let cursor = client.db().collection("dechet").find({id_dechet:id});
        let result = await cursor.toArray();
        if(result.length>0){
            res.status(200).json(result[0]);
        }
        else{
            res.status(204).json({msg : "Ce Dechet n'existe pas "});
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const modifierDechet = async (req, res)=>{
    try {
        let id = new ObjectID(req.params.id);
        let nNom_dechet = req.body.nom_dechet;
       

      let result =  await client.db().collection("dechet").deleteOne({id_dechet: id},{$set :{nom_dechet: nNom_dechet }});
      if(result.modifiedCount==1){
        res.status(200).json({msg : " modification faite "});
    }
    else{
        res.status(404).json({msg : "Ce Dechet n'existe pas "});
    }
      
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const supprimerDechet = async (req, res)=>{
    try {
        let id = new ObjectID(req.params.id);
       

      let result =  await client.db().collection("dechet").updateOne({id_dechet: id});
      if(result.deletedCount==1){
        res.status(200).json({msg : " suppression faite "});
    }
    else{
        res.status(404).json({msg : "Ce Dechet n'existe pas "});
    }

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = {ajouterDechet, getTousDechet, getDechet , modifierDechet , supprimerDechet };