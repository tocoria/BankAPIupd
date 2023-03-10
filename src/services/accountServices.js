const AccountRepository = require('../repositories/accountRepository.js');
const randomString = require('randomstring');
const repository = new AccountRepository();



const findById = async(id) => {
    return await repository.getById(id);
}


const findAll = async(filter, options) => {
    return await repository.getAll(filter, options);
}

const findByAlias = async(aliasOwner) => {
    return await repository.getByAlias(aliasOwner)
}

const findByCvu = async(cvu) => {
    return await repository.getByCvu(cvu)
}

const findbyAliasAndCurrency = async(aliasOwner, currency) => {
    return await repository.getByUserAndCurrency(aliasOwner, currency)
}

const save = async(account) => {
    account.cvu = `CAURABANK00001234${randomString.generate({length: 8, charset: 'numeric'})}`
    return await repository.save(account);
}


const update = async(id, account) => {
    return await repository.update(id, account);
}


const remove = async(id) => {
    return await repository.remove(id);
}

module.exports = {
    findById,
    findAll,
    findByAlias,
    findByCvu,
    findbyAliasAndCurrency,
    save,
    update,
    remove
}
