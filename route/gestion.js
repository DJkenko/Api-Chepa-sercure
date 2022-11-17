const express = require('express');
const { ajouterGestion , getTousGestion, getGestion, modifierGestion, supprimerGestion } = require('../controller/gestion');
const router = express.Router();

router.route("/gestion").post(ajouterGestion);
router.route("/gestion").get(getTousGestion);
router.route("/gestion/:id").get(getGestion)
router.route("/gestion/:id").put(modifierGestion)
router.route("/gestion/:id").delete(supprimerGestion)

module.exports = router;