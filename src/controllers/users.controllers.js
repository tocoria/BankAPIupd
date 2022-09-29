const express = require('express');
const User = require('../models/users.models')

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        res.json(users);

    } catch (err) {
        next(err);
    }
}

const createUser = async (req, res, next) => {

   try { 
    let userData = req.body;
    user = await User.create(userData);

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

    // let userNewData = req.body;
    // await User.updateOne({_id: {$eq: id}}, userNewData);

    let userToUpdate = await User.findById(id); 
    let userData = req.body;

    await User.updateOne(userToUpdate, userData);

    const result = {
        message: 'User updated successfully',
        userData
    }
    res.json(result);
} catch (err) {
    next(err)
}
};

const updatePartialUser = (req, res) => {

    const result = {
        message: 'User updated successfully (with PATCH)'
        
    }
    res.json(result);
};

const deleteUser = async (req, res, next) => {

    try {

    const { id } = req.params;

    const userToDelete = await User.findById(id);

    await userToDelete.remove();

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
    updatePartialUser,
    deleteUser

}