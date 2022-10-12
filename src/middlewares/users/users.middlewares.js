const { check, validationResult, body } = require('express-validator');
const {apiError} = require('../../handlers/apiError.js');
const userService = require('../../services/userServices');
const { ROLES } = require('../../constants/index')



// 'Required' Validations
const _nameRequired = check('name', 'Name Required').not().isEmpty();
const _lastNameRequired = check('lastName', 'Last Name Required').not().isEmpty();
const _emailRequired = check('email', 'Email Required').not().isEmpty();
const _userNameRequired = check('userName', 'Username Required').not().isEmpty();
const _passwordRequired = check('password', 'Password Required').not().isEmpty();






// 'Valid' Validations
const _emailValid = check('email', 'This is not a valid email').isEmail();





// 'Optional Valid' Validations
const _optionalRoleValid = check('role').default('USER_ROLE').custom(
    async (role = '') => {
        if(!ROLES.includes(role)) {
            throw new apiError('Role is not valid in the DB', 400)
        }
    }
)
const _optionalDateValid = check('birthDate').optional().isDate('MM-DD-YYYY');
const _optionalEmailValid = check('email', 'This is not a valid email').optional().isEmail();
const _optionalEmailUnique = check('email').custom(
    async (email = '') => {
        const userFound = await userService.findByEmail(email);

        if(userFound) {

            throw new apiError('Email already exists in the DB', 400)
        }
    }
)
const _optionalUserNameUnique = check('userName').optional().custom(
    async (userName = '') => {
        const userFound = await userService.findByUserName(userName);

        if(userFound) {
            throw new apiError('Username already exists in the DB', 400)
        }
    }
)






// 'Unique' Validations
const _emailUnique = check('email').custom(
    async (email = '') => {
        const userFound = await userService.findByEmail(email);

        if(userFound) {

            throw new apiError('Email already exists in the DB', 400)
        }
    }
)
const _userNameUnique = check('userName').custom(
    async (userName = '') => {
        const userFound = await userService.findByUserName(userName);

        if(userFound) {
            throw new apiError('Username already exists in the DB', 400)
        }
    }
)









// Validation Result
const _validationResult = (req, res, next) => {
    const errors = validationResult(req)
    console.log(errors.errors[0]);
    if(!errors.isEmpty()) {
        throw new apiError('Validation Error', 400, errors.errors);
    }
    next();
}



const postRequestValidations = [
    _nameRequired,
    _lastNameRequired,
    _emailRequired,
    _userNameRequired,
    _passwordRequired,
    _emailUnique,
    _userNameUnique,
    _emailValid,
    _optionalDateValid,
    _optionalRoleValid,
    _validationResult
]




module.exports = {
    postRequestValidations
}