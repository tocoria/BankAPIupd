const accountService = require('../services/accountServices.js')
const operationService = require('../services/operationServices.js')
const Success = require('../handlers/successHandler');

const depositOperation = async (req, res, next) => {
    try{

        const {aliasOwner, currency, amount} = req.body;

        const account = await accountService.findbyAliasAndCurrency(aliasOwner, currency);

        //const accountDeposited = await operationService.deposit(account, amount)

        res.status(200).json(await operationService.deposit(account, amount))
    }
    catch(err) {
        next(err);
    }
}

const withdrawalOperation = async (req, res, next) => {
    try{
         const {aliasOwner, currency, amount} = req.body;
         
         const account = await accountService.findbyAliasAndCurrency(aliasOwner, currency)

        res.status(200).json(await operationService.withdraw(account, amount))
    }
    catch(err){
        next(err)
    }
}

const transferOperation = async(req, res, next) => {
    try{

        const {aliasOwner, amount, currency, trueCVU_falseAlias, bonus} = req.body

        let targetaAccount;
        
        if(trueCVU_falseAlias) {
            targetaAccount = await accountService.findByCvu(req.body.targetCVU)

        }else {
            targetaAccount = await accountService.findbyAliasAndCurrency(req.body.targetAlias, req.body.currency)
        }

        const ownerAccount = await accountService.findbyAliasAndCurrency(aliasOwner, currency)

        res.status(200).json(await operationService.transfer(targetaAccount, ownerAccount, amount, bonus))

    }
    catch(err){
        next(err)
    }
}
module.exports = {
    depositOperation,
    withdrawalOperation,
    transferOperation
}