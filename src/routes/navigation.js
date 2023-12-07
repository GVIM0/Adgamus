const express = require('express');

const GeneralController = require('../controllers/GeneralController');
const FarmingController = require('../controllers/FarmingController');
const PunnetController = require('../controllers/PunnetController');
const RecursosController = require('../controllers/RecursosController');
const UserController = require('../controllers/UserController');
const ChatController = require('../controllers/chatController');
const SocketController = require('../controllers/sockets');

const router = express.Router();



//General

router.get('/ajustes', GeneralController.Ajustes);
router.get('/ChatDeAyuda', ChatController.ChatAyuda);

//Sockets


//Modulo cultivo

router.get('/CuidadoDeCultivos', FarmingController.inicioCultivos);
router.get('/Buscador', FarmingController.buscadorCultivos);
router.get('/BuscarPlanta', FarmingController.search);
router.get('/BusquedaAvanzada', FarmingController.advancedSearch);

//Modulo Punnet

router.get('/SeleccionArtificial', PunnetController.inicioAnimal);

//Modulo Recursos

router.get('/Recursos', RecursosController.inicioRecursos);


//User
router.get('/Perfil', UserController.perfil);

module.exports = router;
