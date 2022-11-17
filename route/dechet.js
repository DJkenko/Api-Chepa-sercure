const express = require('express');
const { ajouterDechet , getTousDechet, getDechet, modifierDechet, supprimerDechet } = require('../controller/dechet');
const router = express.Router();

router.route("/dechet").post(ajouterDechet);
router.route("/dechet").get(getTousDechet);
router.route("/dechet/:id").get(getDechet)
router.route("/dechet/:id").put(modifierDechet)
router.route("/dechet/:id").delete(supprimerDechet)

module.exports = router;