const { check, body} = require('express-validator');
const validator = require('validator');
const {apiError} = require('../../handlers/apiError.js');
const userService = require('../../services/userServices');
const { USER_ROLE, ADMIN_ROLE, ROLES, MEMBERSHIPS } = require('../../constants/index');
const {validationResult} = require("../commons.js");
const { _validJWT, hasRole } = require("./auth.middlewares");


// ---------------------------------------------------------------------------------------------- //
// ------------------------------------ REQUIRED Validations ------------------------------------ //
// ---------------------------------------------------------------------------------------------- //
const _nameRequired = check('name', 'Name Required').not().isEmpty();

const _lastNameRequired = check('lastName', 'Last Name Required').not().isEmpty();

const _emailRequired = check('email', 'Email Required').not().isEmpty();

const _userNameRequired = check('userName', 'Username Required').not().isEmpty();

const _passwordRequired = check('password', 'Password Required').not().isEmpty();

const _idRequired = check('id', 'ID Required').not().isEmpty();

const _emptyAccountNumberRequired = check('accountNumber', 'Account Number cannot be changed').isEmpty();


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

const _defaultRoleValid = check('role').default('USER_ROLE').custom(
    async (role = '') => {
        if(!ROLES.includes(role)) {
            throw new apiError('Role is not valid in the DB', 400)
        }
    }
)

const _idIsMongo = check('id', 'This is not a MongoID').isMongoId()

// ---------------------------------------------------------------------------------------------- //
// --------------------------------- OPTIONAL VALID Validations --------------------------------- //
// ---------------------------------------------------------------------------------------------- //
const _optionalRoleValid = check('role').optional().custom(
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

const _optionalDateValid = check('birthDate', 'This is not a valid date').optional().isDate('MM-DD-YYYY');

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

/* _putValidator handles the different cases of User updating considering the restrictions of membershipType
    (Admins cannot have memberships and user need to have one, being 'SILVER' the default option. Also, it functions as
    a validator for the req.params.id field, checking if it's a valid mongoDB ID and if it exists.)
*/



const _putValidator =  async (req, res, next) => {

    let { id } = req.params

  try{

        if(!validator.isMongoId(id)) {
            throw new apiError('This is not a mongo ID', 400);
        }

        let user = await userService.findById(id)

        if(!user) {
            throw new apiError('User not found', 400);
        }

        if(!req.body.role && req.body.membershipType && user.role=="ADMIN_ROLE" ) {
            throw new apiError('Cannot assign membership to Admin user', 400)
        }
        if(req.body.role == 'ADMIN_ROLE' && req.body.membershipType) {
            throw new apiError('Cannot assign membership to Admin user', 400)
        }
        if(req.body.role == 'ADMIN_ROLE' && user.membershipType) {
            req.body.membershipType = null;
            
        }
        if(req.body.role == 'USER_ROLE' && !user.membershipType && !req.body.membershipType) {
            req.body.membershipType = 'SILVER'
        }
        next();
        }
    catch(err) {
        next(err);
    }
}




// ---------------------------------------------------------------------------------------------- //
// ------------------------------------- EXISTS Validations ------------------------------------- //
// ---------------------------------------------------------------------------------------------- //

const _idExists = check('id').custom(
    async (id = '') => {
        const idFound = await userService.findById(id);

        if(!idFound) {
            throw new apiError('This ID does not exist in the DB', 400)
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


const postRequestValidations = [
    _validJWT,
    hasRole(ADMIN_ROLE),
    _nameRequired,
    _lastNameRequired,
    _emailRequired,
    _userNameRequired,
    _passwordRequired,
    _emailUnique,
    _emailValid,
    _userNameUnique,
    _optionalDateValid,
    _defaultRoleValid,
    _membershipValid,
    _membershipDefault,
    validationResult
]

const putRequestValidations = [
    _validJWT,
    hasRole(ADMIN_ROLE),
    _emptyAccountNumberRequired,
    _optionalDateValid,
    _optionalRoleValid,
    _optionalEmailUnique,
    _optionalEmailValid,
    _optionalMembershipValid,
    _optionalUserNameUnique,
    _putValidator,
    validationResult
    

]

const getRequestValidations = [
    _validJWT,
    validationResult
]

const getRequestByIdValidations = [
    _validJWT,
    _idRequired,
    _idIsMongo,
    _idExists,
    validationResult

]
const deleteRequestValidations = [
    _validJWT,
    hasRole(ADMIN_ROLE),
    _idRequired,
    _idIsMongo,
    _idExists,
    validationResult


]



module.exports = {
    postRequestValidations,
    putRequestValidations,
    getRequestByIdValidations,
    getRequestValidations,
    deleteRequestValidations
}