const accountService = require('../services/accountServices.js')
const Success = require('../handlers/successHandler');

const getAllAccounts = async (req, res, next) => {
    try {
        const accounts = await accountService.findAll(req.query.filter, req.query.options)
        res.status(200).json(new Success(accounts));

    } catch (err) {
        next(err);
    }
}

const getAccountById = async (req, res, next) => {

    try {

        const account = await accountService.findById(req.params.id);
        res.status(200).json(new Success(account));


    } catch (err) {
        next(err);
    }

};


const createAccount = async (req, res, next) => {

   try {

    let accountData = req.body;


    account = await accountService.save(accountData);

    res.status(201).json(new Success(account));
} catch (err) {
    next(err);
}
}

const updateAccount = async (req, res, next) => {
    try {
    const { id } = req.params;
    let account = req.body;


    accountUpdated = await accountService.update(id, account); 
    

    res.status(201).json(new Success(accountUpdated));
} catch (err) {
    next(err);
}
};


const deleteAccount = async (req, res, next) => {

    try {

    const { id } = req.params;

    const accountToDelete = await accountService.remove(id);


    res.status(200).json(new Success(accountToDelete));
} catch (err) {
    next(err);
}
};

module.exports = {
    getAccountById,
    getAllAccounts,
    createAccount,
    deleteAccount,
    updateAccount
}