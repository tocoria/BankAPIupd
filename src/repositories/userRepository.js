const User = require('../models/users.models');
const encrypter = require('../handlers/bsCrypt.js');

class UserRepository {
    constructor(){

    }


    async getAll() {
        return await User.find();
    }

    async getAllWithPagination(filter, options) {
        return await User.paginate(filter, options)
    }

    async getById(id) {
        return await User.findById(id);
    }

    async save(user) {
        user.accountNumber = Math.floor(1000000000 + Math.random() * 8999999999)
        user.password = await encrypter.hashPassword(user.password);
        return await User.create(user);
    }

    async update(id, user) {
        return await User.findByIdAndUpdate(id, user, {new: true});
    }

    async remove(id) {
        return await User.findByIdAndRemove(id);
    }
}

module.exports = UserRepository;