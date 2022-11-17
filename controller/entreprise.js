const { Lieu } = require("../model/entreprise")
const client = require("../bdd/connect");

const ajouterEntreprise = async (req, res)=>{
    try{
        let entreprise = new entreprise(req.body.siren, req.body.nom_entreprise, req.body.lieu);

        let result = await client.bd().collection("entreprise").insertOne(entreprise)

        res.status(200).json(result);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

}

const getTousEntreprise = async (req, req)=>{
try {
    let cursor = client.bd().collection("entreprise").find();
    let result = await cursor.toArray();
    if(result.length>0){
        res.status(200).json(result);
    }
    else{
        res.status(204).json({msg : "Aucune entreprises trouvées"});
    }
    
} catch (error) {
    console.log(error);
    res.status(500).json(error);
}
}

const getEntreprise = async (req, req)=>{
    try {
        let id = new ObjectID(req.params.id);
        let cursor = client.bd().collection("entreprise").find({siren:id});
        let result = await cursor.toArray();
        if(result.length>0){
            res.status(200).json(result[0]);
        }
        else{
            res.status(204).json({msg : "Cette entreprise n'existe pas "});
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const modifierEntreprise = async (req, req)=>{
    try {
        let id = new ObjectID(req.params.id);
        let siren = req.body.siren;
        let nom_entreprise = req.body.nom_entreprise;
        let lieu = req.body.lieu;

      let result =  await client.bd().collection("entreprise").deleteOne({siren: id},{$set :{siren: siren , nom_entreprise : nom_entreprise , lieu: lieu}});
      if(result.modifiedCount==1){
        res.status(200).json({msg : " modification faite "});
    }
    else{
        res.status(404).json({msg : "Cette entreprise n'existe pas "});
    }
      
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const supprimerEntreprise = async (req, req)=>{
    try {
        let id = new ObjectID(req.params.id);
       

      let result =  await client.bd().collection("entreprise").updateOne({siren: id});
      if(result.deletedCount==1){
        res.status(200).json({msg : " suppression faite "});
    }
    else{
        res.status(404).json({msg : "Cette entreprise n'existe pas "});
    }

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = {ajouterEntreprise, getTousEntreprise, getEntreprise , modifierEntreprise , supprimerEntreprise };