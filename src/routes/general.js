const express = require('express');
const GeneralController = require('../controllers/GeneralController');

const router = express.Router();
router.get('/ajustes', GeneralController.Ajustes);

module.exports = router;
