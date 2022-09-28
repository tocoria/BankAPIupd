const express = require('express');

const getAllUsers = (req, res) => {
    const users = [
        {
        id: 1,
        name: 'Tomas'
        },

        {
        id: 2,
        name: 'Yumin'

        },
    ]

    res.json(users);
}

const createUser = (req, res) => {

    const user = req.body;
    user.id = 123;

    const result = {
        message: 'User created successfully',
        user
    }
    res.status(201).json(result);
}

const updateUser = (req, res) => {
    const { id } = req.params;
    const user = req.body

    user.id = id;

    const result = {
        message: 'User updated successfully',
        user
    }
    res.json(result);
};

const updatePartialUser = (req, res) => {

    const result = {
        message: 'User updated successfully (with PATCH)'
        
    }
    res.json(result);
};

const deleteUser = (req, res) => {
    const { id } = req.params;

    const result = {
        message: `User with id: ${id} deleted successfully`
    }
    res.json(result);
};

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    updatePartialUser,
    deleteUser

}