const { Router } = require('express');
const {getAllUsers, createUser, updateUser, getUserById, deleteUser} = require('../controllers/users.controllers')
const { postRequestValidations,
        putRequestValidations,
        getRequestValidations,
        getRequestByIdValidations,
        deleteRequestValidations
        } = require('../middlewares/users.middlewares')


const router = Router();

router.get('/',getRequestValidations, getAllUsers);
router.get('/:id', getRequestByIdValidations,  getUserById);
router.post('/', postRequestValidations, createUser);
//router.post('/', createUser);
router.put('/:id', putRequestValidations, updateUser);
router.delete('/:id', deleteRequestValidations, deleteUser);

module.exports = router;