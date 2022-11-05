const AccountRepository = require('../repositories/accountRepository.js');
const repository = new AccountRepository();



const findById = async(id) => {
    return await repository.getById(id);
}


const findAll = async(filter, options) => {
    return await repository.getAll(filter, options);
}

const findByAlias = async(aliasOwner) => {
    return await repository.getByEmail(aliasOwner)
}

const findByCvu = async(cvu) => {
    return await repository.getByUserName(cvu)
}


const save = async(account) => {
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
    save,
    update,
    remove
}
