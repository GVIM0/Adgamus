const express = require('express');
const AdminController = require('../controllers/AdminController');
const router = express.Router();

router.get('/CRUDplantas', AdminController.CRUDplantas);
router.post('/CRUDplantas', AdminController.createPlants);
router.get('/readPlant', AdminController.readPlants);
router.get('/updatePlant/:idCultivo', AdminController.redirectUpdatePlant);
router.post('/updatePlant/:idCultivo', AdminController.updatePlant);
router.delete('/deletePlant/:idCultivo', AdminController.deletePlant);


module.exports = router; 