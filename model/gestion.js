class Gestion{
    constructor(id_gestion, entreprise, date, dechet, poid){
        this.id_gestion= id_gestion;
        this.entreprise=entreprise;
        this.date=date;
        this.dechet=dechet;
        this.poid=poid;
    }
}

module.exports = { Gestion }