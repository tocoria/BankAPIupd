const UserRepository = require('../repositories/userRepository');
const repository = new UserRepository();



const findById = async(id) => {
    return await repository.getById(id);
}


const findAll = async(filter, options) => {
    return await repository.getAll(filter, options);
}

const findByEmail = async(email) => {
    return await repository.getByEmail(email)
}

const findByUserName = async(username) => {
    return await repository.getByUserName(username)
}


const save = async(user) => {
    return await repository.save(user);
}


const update = async(id, user) => {
    return await repository.update(id, user);
}


const remove = async(id) => {
    return await repository.remove(id);
}

module.exports = {
    findAll,
    findById,
    findByEmail,
    findByUserName,
    save,
    update,
    remove
}
