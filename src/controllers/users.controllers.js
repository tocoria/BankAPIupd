const express = require('express');
const userService = require('../services/userServices')
const Success = require('../handlers/successHandler');

const getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.findAll(req.query.filter, req.query.options)
        res.status(200).json(new Success(users));

    } catch (err) {
        next(err);
    }
}

const getUserById = async (req, res, next) => {

    try {

        const user = await userService.findById(req.params.id);
        res.status(200).json(new Success(user));

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

    res.status(201).json(new Success(user));
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


    res.status(201).json(new Success(userUpdated));
} catch (err) {
    next(err)
}
};


const deleteUser = async (req, res, next) => {

    try {

    const { id } = req.params;

    const userToDelete = await userService.remove(id);


    res.status(200).json(new Success(userToDelete));
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