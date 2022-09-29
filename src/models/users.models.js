const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    name: String,
    lastName: String,
    userName: String,
    password: String,
    email: String,
    birthDate: Date,
    accountNumber: Number
},
    {
    timestamps: true
    }
);

module.exports = mongoose.model('users', userSchema);

