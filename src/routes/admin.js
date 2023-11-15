const express = require('express');
const AdminController = require('../controllers/AdminController');
const router = express.Router();

router.get('/CRUDplantas', AdminController.CRUDplantas);


module.exports = router; 