const express = require('express');
const {ajouterEntreprise, getTousEntreprise, getEntreprise , modifierEntreprise , supprimerEntreprise } = require('../controller/entreprise');
const router = express.Router();

router.route("/entreprise").post(ajouterEntreprise);
router.route("/entreprise").get(getTousEntreprise);
router.route("/entreprise/:id").get(getEntreprise)
router.route("/entreprise/:id").put(modifierEntreprise)
router.route("/entreprise/:id").delete(supprimerEntreprise)

module.exports = router;