const Account = require('../models/accounts.models')

class AccountRepository {

    constructor(){

    }


    async getAll(filter, options) {
        return await Account.paginate(filter, options)
    }

    async getById(id) {
        return await Account.findById(id);
    }

    async getByCvu(cvu) {
        return await Account.findOne({cvu})
    }

    async getByAlias(aliasOwner) {
        return await Account.findOne({aliasOwner: aliasOwner})
    }

    async save(account) {
        return await Account.create(account);
    }

    async update(id, account) {

        return await Account.findByIdAndUpdate(id, account, {new: true});

    }

    async remove(id) {
        return await Account.findByIdAndRemove(id);
    }


}

module.exports = AccountRepository;