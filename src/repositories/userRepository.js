const User = require('../models/users.models');

class UserRepository {
    constructor(){

    }


    async getAll() {
        return await User.find();
    }

    async getById(id) {
        return await User.findById(id);
    }

    async save(user) {
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