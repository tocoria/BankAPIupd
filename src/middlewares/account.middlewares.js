const { check} = require('express-validator');
const {apiError} = require('../handlers/apiError.js');
const accountService = require('../services/accountServices');
const { USER_ROLE, ADMIN_ROLE, ROLES, MEMBERSHIPS, CURRENCIES } = require('../constants/index');
const {validationResult} = require("./commons.js");
const { _validJWT, hasRole } = require("./auth.middlewares");


const _currencyRequired = check('currency', 'Currency required').not().isEmpty();


const _currencyValid = check('currency').custom(
    async (currency = '') => {
        if(!CURRENCIES.includes(currency)) {
            throw new apiError('This is not a valid currency type', 400)
        }
    }

)

const _optionalCurrencyValid = check('currency').optional().custom(
    async (currency = '') => {
        if(!CURRENCIES.includes(currency)) {
            throw new apiError('This is not a valid currency type', 400)
        }
    }

)

const _idExists = check('id').custom(
    async (id = '') => {
        const idFound = await accountService.findById(id);

        if(!idFound) {
            throw new apiError('This account ID does not exist in the DB', 400)
        }
    }
)

const _cvuNotExists = check('cvu','CVU cannot be chosen').isEmpty();




const getRequestValidations = [
    _validJWT,
    hasRole(ADMIN_ROLE),
    validationResult
]

const getByIdRequestValidations = [
    _validJWT,
    _idExists,
    validationResult
]

const postRequestValidations = [
    _validJWT,
    hasRole(USER_ROLE),
    _currencyRequired,
    _currencyValid,
    validationResult
]

const putRequestValidations = [
    _validJWT,
    _cvuNotExists,
    _idExists,
    _optionalCurrencyValid,
    validationResult
]

const deleteRequestValidations = [
    _idExists,
    hasRole(ADMIN_ROLE),
    _validJWT,
    validationResult

]

module.exports = {
    getRequestValidations,
    getByIdRequestValidations,
    postRequestValidations,
    putRequestValidations,
    deleteRequestValidations
}