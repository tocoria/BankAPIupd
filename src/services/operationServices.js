const { models } = require('mongoose');
const AccountRepository = require('../repositories/accountRepository.js');
const repository = new AccountRepository();


const deposit = async(account, amount) => {

    account.balance = account.balance + amount

    return await repository.update(account.id, account);
}

const withdraw = async(account, amount) => {
    
    account.balance = account.balance - amount

    return await repository.update(account.id, account)
}

const transfer = async(targetAccount, ownerAccount, amount, bonus) => {

    
    targetAccount.balance = targetAccount.balance + amount
    ownerAccount.balance = ownerAccount.balance - amount
    ownerAccount.points = ownerAccount.points + bonus

    
    
    return [await repository.update(ownerAccount.id, ownerAccount), await repository.update(targetAccount.id, targetAccount)]



}

module.exports = {
    deposit,
    withdraw,
    transfer
}