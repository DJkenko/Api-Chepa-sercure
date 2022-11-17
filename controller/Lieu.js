const { Lieu } = require("../model/Lieu")
const client = require("../bdd/connect");

const ajouterLieu = async (req, res)=>{
    try{
        let lieu = new Lieu(req.body.id_adresse, req.body.adresse, req.body.code_postale, req.body.commune);

        let result = await client.bd().collection("lieu").insertOne(lieu)

        res.status(200).json(result);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

}

const getTousLieu = async (req, res)=>{
try {
    let cursor = client.bd().collection("lieu").find();
    let result = await cursor.toArray();
    if(result.length>0){
        res.status(200).json(result);
    }
    else{
        res.status(204).json({msg : "Aucun lieu trouvé"});
    }
    
} catch (error) {
    console.log(error);
    res.status(500).json(error);
}
}

const getLieu = async (req, res)=>{
    try {
        let id = new ObjectID(req.params.id);
        let cursor = client.bd().collection("lieu").find({id_adresse:id});
        let result = await cursor.toArray();
        if(result.length>0){
            res.status(200).json(result[0]);
        }
        else{
            res.status(204).json({msg : "Ce Lieu n'existe pas "});
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const modifierLieu = async (req, res)=>{
    try {
        let id = new ObjectID(req.params.id);
        let nAdresse = req.body.adresse;
        let nCodePostale = req.body.code_postale;
        let nCommune = req.body.commune;

      let result =  await client.bd().collection("lieu").deleteOne({id_adresse: id},{$set :{adresse: nAdresse , code_postale: nCodePostale , commune: nCommune}});
      if(result.modifiedCount==1){
        res.status(200).json({msg : " modification faite "});
    }
    else{
        res.status(404).json({msg : "Ce Lieu n'existe pas "});
    }
      
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const supprimerLieu = async (req, res)=>{
    try {
        let id = new ObjectID(req.params.id);
       

      let result =  await client.bd().collection("lieu").updateOne({id_adresse: id});
      if(result.deletedCount==1){
        res.status(200).json({msg : " suppression faite "});
    }
    else{
        res.status(404).json({msg : "Ce Lieu n'existe pas "});
    }

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = {ajouterLieu, getTousLieu, getLieu , modifierLieu , supprimerLieu };