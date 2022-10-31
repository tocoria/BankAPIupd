const { Router } = require('express');
const { login } = require('../controllers/auth.controllers.js')
const { authValidations } = require('../middlewares/users/auth.middlewares.js')


const router = Router();

router.post('/login', authValidations, login);


module.exports = router;