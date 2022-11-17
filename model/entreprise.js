class Entreprise{
    constructor(siren, nom_entreprise, lieu) {
        this.siren = siren;
        this.nom_entreprise = nom_entreprise;
        this.lieu = lieu;
    }
}

module.exports = { Entreprise }