const express = require('express');

const GeneralController = require('../controllers/GeneralController');
const FarmingController = require('../controllers/FarmingController');

const router = express.Router();



//General

router.get('/ajustes', GeneralController.Ajustes);

//Modulo cultivo

router.get('/CuidadoDeCultivos', FarmingController.inicioCultivos);
router.get('/Buscador', FarmingController.buscadorCultivos);


module.exports = router;
