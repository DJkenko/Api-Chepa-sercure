const { Gestion } = require("../model/gestion")
const client = require("../bdd/connect");

const ajouterGestion = async (req, res)=>{
    try{
        let gestion = new Gestion(req.body.id_gestion, req.body.entreprise, req.body.date, req.body.dechet , req.body.poid);

        let result = await client.db().collection("gestion").insertOne(gestion)

        res.status(200).json(result);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

}

const getTousGestion = async (req, res)=>{
try {
    let cursor = client.db().collection("gestion").find();
    let result = await cursor.toArray();
    if(result.length>0){
        res.status(200).json(result);
    }
    else{
        res.status(204).json({msg : "Aucun gestion trouvé"});
    }
    
} catch (error) {
    console.log(error);
    res.status(500).json(error);
}
}

const getGestion = async (req, res)=>{
    try {
        let id = new ObjectID(req.params.id);
        let cursor = client.db().collection("gestion").find({id_gestion:id});
        let result = await cursor.toArray();
        if(result.length>0){
            res.status(200).json(result[0]);
        }
        else{
            res.status(204).json({msg : "Cette Gestion n'existe pas "});
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const modifierGestion = async (req, res)=>{
    try {
        let id = new ObjectID(req.params.id);
        let nEntreprise = req.body.entreprise;
        let nDate = req.body.date;
        let nDechet = req.body.dechet;
        let nPoid = req.body.poid;

      let result =  await client.db().collection("gestion").deleteOne({id_gestion: id},{$set :{entreprise: nEntreprise , date: nDate , dechet: nDechet, poid: nPoid}});
      if(result.modifiedCount==1){
        res.status(200).json({msg : " modification faite "});
    }
    else{
        res.status(404).json({msg : "Cette Gestion n'existe pas "});
    }
      
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const supprimerGestion = async (req, res)=>{
    try {
        let id = new ObjectID(req.params.id);
       

      let result =  await client.db().collection("gestion").updateOne({id_gestion: id});
      if(result.deletedCount==1){
        res.status(200).json({msg : " suppression faite "});
    }
    else{
        res.status(404).json({msg : "Ce Gestion n'existe pas "});
    }

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = {ajouterGestion, getTousGestion, getGestion , modifierGestion , supprimerGestion };
