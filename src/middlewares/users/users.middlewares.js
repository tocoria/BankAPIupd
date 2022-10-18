const { check, validationResult, body, param } = require('express-validator');
const {apiError} = require('../../handlers/apiError.js');
const userService = require('../../services/userServices');
const { ROLES, MEMBERSHIPS } = require('../../constants/index');


// ---------------------------------------------------------------------------------------------- //
// ------------------------------------ REQUIRED Validations ------------------------------------ //
// ---------------------------------------------------------------------------------------------- //
const _nameRequired = check('name', 'Name Required').not().isEmpty();

const _lastNameRequired = check('lastName', 'Last Name Required').not().isEmpty();

const _emailRequired = check('email', 'Email Required').not().isEmpty();

const _userNameRequired = check('userName', 'Username Required').not().isEmpty();

const _passwordRequired = check('password', 'Password Required').not().isEmpty();


// ---------------------------------------------------------------------------------------------- //
// -------------------------------------- VALID Validations ------------------------------------- //
// ---------------------------------------------------------------------------------------------- //
const _emailValid = check('email', 'This is not a valid email').isEmail();

const _membershipValid = check('membershipType').if(body('membershipType').exists()).custom(
    async (membershipType = '', { req } ) => {
        if(req.body.role == 'ADMIN_ROLE') {
            throw new apiError('Admin users cannot have memberships', 400)
        }
        
        if(!MEMBERSHIPS.includes(membershipType)) {
            throw new apiError('This is not a valid membership', 400)
        }

    }
)

/* _membershipDefault checks if the request.body has no membershipType field
    and sets it to 'SILVER' only if it doesn't intend to create an ADMIN_ROLE user */

const _membershipDefault = (req, res, next) => {
    if((req.body.role == 'USER_ROLE' || !req.body.role) && (!req.body.membershipType)) {
        req.body.membershipType = 'SILVER';
    
    }
    next();
}

const _idIsMongo = param('_id').isMongoId('This is not a MONGODB id', 400)

// ---------------------------------------------------------------------------------------------- //
// --------------------------------- OPTIONAL VALID Validations --------------------------------- //
// ---------------------------------------------------------------------------------------------- //
const _optionalRoleValid = check('role').default('USER_ROLE').custom(
    async (role = '') => {
        if(!ROLES.includes(role)) {
            throw new apiError('Role is not valid in the DB', 400)
        }
    }
)

const _optionalMembershipValid = check('membershipType').optional().custom(
    async (membershipType = '') => {
        if(!MEMBERSHIPS.includes(membershipType)) {
            throw new apiError('Membership is not valid', 400)
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








// ---------------------------------------------------------------------------------------------- //
// ------------------------------------- UNIQUE Validations ------------------------------------- //
// ---------------------------------------------------------------------------------------------- //
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








// ---------------------------------------------------------------------------------------------- //
// -------------------------------------- VALIDATION RESULT ------------------------------------- //
// ---------------------------------------------------------------------------------------------- //
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
    _membershipValid,
    _membershipDefault,
    _validationResult
]

const putRequestValidations = [
    _optionalDateValid,
    _optionalRoleValid,
    _optionalEmailUnique,
    _optionalEmailValid,
    _optionalMembershipValid,
    _optionalUserNameUnique,
   // _idIsMongo

]



module.exports = {
    postRequestValidations,
    putRequestValidations
}