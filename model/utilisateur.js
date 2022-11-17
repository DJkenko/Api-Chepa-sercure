class Utilisateur{
    constructor(username, password, token){
        this.username = username;
        this.password = password;
        this.token = token;
    }
}

module.exports = { Utilisateur }