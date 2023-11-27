const express = require('express');

const GeneralController = require('../controllers/GeneralController');
const FarmingController = require('../controllers/FarmingController');
const PunnetController = require('../controllers/PunnetController');

const router = express.Router();



//General

router.get('/ajustes', GeneralController.Ajustes);

//Modulo cultivo

router.get('/CuidadoDeCultivos', FarmingController.inicioCultivos);
router.get('/Buscador', FarmingController.buscadorCultivos);
router.get('/BuscarPlanta', FarmingController.search);
router.get('/BusquedaAvanzada', FarmingController.advancedSearch);

//Modulo Punnet

router.get('/SeleccionArtificial', PunnetController.inicioAnimal);



module.exports = router;
