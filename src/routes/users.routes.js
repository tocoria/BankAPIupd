const { Router } = require('express');
const {getAllUsers, createUser, updateUser, getUserById, deleteUser} = require('../controllers/users.controllers')
const { postRequestValidations } = require('../middlewares/users/users.middlewares')


const router = Router();

router.get('/', getAllUsers);
router.post('/', postRequestValidations, createUser);
router.put('/:id', updateUser);
router.get('/:id', getUserById);
router.delete('/:id', deleteUser);

module.exports = router;