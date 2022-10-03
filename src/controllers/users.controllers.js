const express = require('express');
const userService = require('../services/userServices')

const getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.findAll()
        res.json(users);

    } catch (err) {
        next(err);
    }
}

const getUserById = async (req, res, next) => {

    try {

        const user = await userService.findById(req.params.id);
        res.json(user);

        // const result = {
        //     user: userService.findById(req.params.id)
        // }
        // res.json(req.params.id);

    } catch (err) {
        next(err);
    }

};


const createUser = async (req, res, next) => {

   try { 
    let userData = req.body;
    user = await userService.save(userData);

    const result = {
        message: 'User created successfully',
        user
    }
    res.status(201).json(result);
} catch (err) {
    next(err);
}
}

const updateUser = async (req, res, next) => {
    try {
    const { id } = req.params;
    let user = req.body;

    // let userNewData = req.body;
    // await User.updateOne({_id: {$eq: id}}, userNewData);

    const userUpdated = await userService.update(id, user); 


    const result = {
        message: 'User updated successfully',
        userUpdated
    }
    res.json(result);
} catch (err) {
    next(err)
}
};


const deleteUser = async (req, res, next) => {

    try {

    const { id } = req.params;

    const userToDelete = await userService.remove(id);


    const result = {
        message: `User with id: ${id} deleted successfully`
    }
    res.json(result);
} catch (err) {
    next(err);
}
};

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    getUserById,
    deleteUser

}