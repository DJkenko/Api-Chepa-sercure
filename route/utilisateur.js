const express = require('express');
const { ajouterUtilisateur } = require('../controller/utilisateur');
const router = express.Router();

router.route("/utilisateur").post(ajouterUtilisateur);

module.exports = router;