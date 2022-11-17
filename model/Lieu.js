class Lieu{
    constructor(id_adresse,adresse,code_postale,commune){
        this.id_adresse = id_adresse;
        this.adresse = adresse;
        this.code_postale = code_postale;
        this.commune = commune;
    }
}

module.exports = { Lieu }