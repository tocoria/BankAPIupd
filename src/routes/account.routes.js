const { Router } = require('express');
const {getAllAccounts, createAccount, updateAccount, getAccountById, deleteAccount} = require('../controllers/accounts.controllers.js')

const router = Router();

router.get('/', getAllAccounts);
router.get('/:id', getAccountById);
router.post('/', createAccount);
router.put('/:id', updateAccount);
router.delete('/:id', deleteAccount);

module.exports = router;