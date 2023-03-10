const { Router } = require('express');
const {getAllAccounts, createAccount, updateAccount, getAccountById, deleteAccount} = require('../controllers/accounts.controllers.js')
const {getRequestValidations,
     getByIdRequestValidations,
     postRequestValidations,
     putRequestValidations,
     deleteRequestValidations} = require('../middlewares/account.middlewares.js')

const router = Router();

router.get('/', getRequestValidations, getAllAccounts);
router.get('/:id', getByIdRequestValidations, getAccountById);
router.post('/', postRequestValidations, createAccount);
router.put('/:id', putRequestValidations, updateAccount);
router.delete('/:id',deleteRequestValidations, deleteAccount);

module.exports = router;