const express = require('express');
const authService = require('../services/authServices')
const Success = require('../handlers/successHandler');
const apiError = require("../handlers/apiError")

const login = async (req, res, next) => {

    const {email, password} = req.body;

    try{
      
        res.status(200).json(new Success( await authService.login(email, password)))

    }
    catch(err){
        next(err);
    }


}


module.exports = {
    login

}