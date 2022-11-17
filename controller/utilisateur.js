const { Utilisateur } = require("../model/utilisateur")
const client = require("../bd/connect");

const ajouterUtilisateur = async (req, res)=>{
    try {
        let utilisateur = new Utilisateur(req.body.username, req.body.password);

        let result = await client.bd().collection('user').insertOne(utilisateur)
    
        res.status(200).json(result);
    
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = {ajouterUtilisateur}