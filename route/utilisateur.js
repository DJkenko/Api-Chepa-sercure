const express = require('express');
const { ajouterUtilisateur, getTousUtilisateur } = require('../controller/utilisateur');
const router = express.Router();

router.route("/utilisateur").post(ajouterUtilisateur);
router.route("/allUser").get(getTousUtilisateur);

module.exports = router;