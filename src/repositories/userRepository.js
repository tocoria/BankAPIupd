const User = require('../models/users.models');
const encrypter = require('../handlers/bsCrypt.js');

class UserRepository {
    constructor(){

    }


    async getAll(filter, options) {
        return await User.paginate(filter, options)
    }

    async getById(id) {
        return await User.findById(id);
    }

    async getByEmail(email) {
        return await User.findOne({email})
    }

    async getByUserName(username) {
        return await User.findOne({userName: username})
    }

    async save(user) {
        user.password = await encrypter.hashPassword(user.password);
        return await User.create(user);
    }

    async update(id, user) {

        if(user.password){
            user.password = await encrypter.hashPassword(user.password);

        }
        return await User.findByIdAndUpdate(id, user, {new: true});

    }

    async remove(id) {
        return await User.findByIdAndRemove(id);
    }
}

module.exports = UserRepository;