const express = require('express');
const { ajouterLieu , getTousLieu, getLieu, modifierLieu, supprimerLieu } = require('../controller/Lieu');
const router = express.Router();

router.route("/lieu").post(ajouterLieu);
router.route("/lieu").get(getTousLieu);
router.route("/lieu/:id").get(getLieu)
router.route("/lieu/:id").put(modifierLieu)
router.route("/lieu/:id").delete(supprimerLieu)

module.exports = router;