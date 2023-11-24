const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();

router.get('/Perfil', UserController.perfil);


module.exports = router; 