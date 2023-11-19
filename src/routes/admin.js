const express = require('express');
const AdminController = require('../controllers/AdminController');
const router = express.Router();

router.get('/CRUDplantas', AdminController.CRUDplantas);
router.post('/CRUDplantas', AdminController.createPlants);
router.get('/readPlant', AdminController.readPlants);


module.exports = router; 