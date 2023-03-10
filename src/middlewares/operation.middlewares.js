const { check} = require('express-validator');
const {apiError} = require('../handlers/apiError.js');
const accountService = require('../services/accountServices');
const { USER_ROLE, ADMIN_ROLE, ROLES, MEMBERSHIPS, CURRENCIES } = require('../constants/index');
const {validationResult} = require("./commons.js");
const { _validJWT, hasRole } = require("./auth.middlewares");

const _amountRequired = check('amount', 'Amount Required').not().isEmpty().isNumeric();

const _trueFalseAliasRequired = check('trueCVU_falseAlias', 'Need to select CVU or Alias').not().isEmpty().isBoolean();

const _setAliasOwner = async (req, res, next) => {

    try{

    req.body.aliasOwner = req.user.userName;

    next();

    }
    catch(err) {
        next(err)
    }


}





const _validateCVUAlias = async (req, res, next) => {
    try {

        if(req.body.trueCVU_falseAlias && (req.body.targetAlias || !req.body.targetCVU)) {
            throw new apiError('Target CVU is required to continue the operation', 400)
        }

        if(!req.body.trueCVU_falseAlias && (req.body.targetCVU || !req.body.targetAlias)) {
            throw new apiError('Target Alias is required to continue the operation', 400)
        }

        if(req.body.trueCVU_falseAlias && !accountService.findByCvu(req.body.targetCVU)) {
            throw new apiError('User not found (CVU)', 404)
        }

        if(!req.body.trueCVU_falseAlias && !accountService.findbyAliasAndCurrency(req.body.targetCVU, req.body.currency)) {
            throw new apiError('User not found (Alias)', 404)
        }



        next();

    }
    catch(err) {
        next(err)
    }
}

const _validateSufficientBalance  = async (req, res, next) => {
    try{

        const {amount} = req.body

        const ownerAccount = await accountService.findByAlias(req.user.userName)

        if(ownerAccount.balance < amount) {
            throw new apiError('Unsufficient balance', 400)
        }

        next();

    }
    catch(err) {
        next(err);
    }
}


// _membershipBonusPoints checks the membership status from Owner and give 5 (SILVER) or 10 (GOLD) rewards points.
const _membershipBonusPoints = async (req, res, next) => {
    try{
        let bonus;

        req.user.membershipType == 'GOLD' ? bonus = 10 : bonus = 5;
    
        req.body.bonus = bonus;

        next();
    
    }
    catch(err){
        next(err);
    }
}

const depositValidations = [
    _validJWT,
    hasRole(USER_ROLE),
    _setAliasOwner,
    _amountRequired,
    validationResult
    
]

const withdrawValidations = [
    _validJWT,
    hasRole(USER_ROLE),
    _setAliasOwner,
    _amountRequired,
    _validateSufficientBalance,
    validationResult
]

const transferValidations = [
    _validJWT,
    hasRole(USER_ROLE),
    _setAliasOwner,
    _amountRequired,
    _trueFalseAliasRequired,
    _validateCVUAlias,
    _validateSufficientBalance,
    _membershipBonusPoints,
    validationResult
]

module.exports = {
    depositValidations,
    withdrawValidations,
    transferValidations
}