const express = require('express');
const { connecter } = require('./bd/connect');

const routesUtilisateur = require("./route/utilisateur");

const app = express();

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.use("/api/v1", routesUtilisateur);

const url = "mongodb+srv://test:test@cluster0.lipmloq.mongodb.net/?retryWrites=true&w=majority";
connecter(url, (erreur) => {
    if (erreur) {
        console.log("Erreur lors de la connexion BD");
        process.exit(-1);
    } else {
        console.log("Connexion établie");
        app.listen(3000);
        console.log("Attente des requêtes au port 3000");
    }
})

return app;
