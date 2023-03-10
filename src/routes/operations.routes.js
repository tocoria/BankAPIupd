const { Router } = require('express');
const {depositOperation, withdrawalOperation, transferOperation} = require('../controllers/operations.controllers.js')
const {depositValidations, withdrawValidations, transferValidations} = require('../middlewares/operation.middlewares.js')

const router = Router();
router.put('/deposit', depositValidations, depositOperation);
router.put('/withdraw', withdrawValidations, withdrawalOperation);
router.put('/transfer', transferValidations, transferOperation)

module.exports = router;

