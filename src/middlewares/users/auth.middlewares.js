const { check } = require('express-validator');
const {validationResult} = require("../commons.js")
const { validateToken, validRole } = require("../../services/authServices.js");
const logger = require("../../loaders/logger/index")



const _emailRequired = check('email', 'Email Required').not().isEmpty();
const _passwordRequired = check('password', 'Password Required').not().isEmpty();
const _emailValid = check('email', 'This is not a valid email').isEmail();



//  _validateJWT receives the token sent through the header, passes it to validToken() which returns the user associated to that token  //

const _validJWT = async (req,res,next) => {
    try{

        const token = req.header('Authorization');

        const userObtained = await validateToken(token);
        req.user = userObtained;

        next();





    }
    catch(error){
        next(error);
    }
}

const hasRole =  ( ...roles) => {
    return  (req, res, next) => {
        try{
           validRole(req.user, ...roles);
            next();

        }
        catch(err){
            next(err)
        }
    }

}




const authValidations = [
    _emailRequired,
    _passwordRequired,
    _emailValid,
    validationResult
]

module.exports = {
    authValidations,
    _validJWT,
    hasRole
}
