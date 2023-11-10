const express = require('express');
const LoginController = require('../controllers/LoginController');

const router = express.Router();

router.get('/Adgamus/login/', LoginController.login);
router.post('/Adgamus/login', LoginController.auth);
router.get('/Adgamus/register', LoginController.register);
router.post('/Adgamus/register', LoginController.storeUser);
router.get('/Adgamus/logout', LoginController.logout);


module.exports = router;
