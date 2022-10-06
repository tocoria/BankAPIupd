const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    name: {
        type: String,
        required: [true, 'Name required']
    },
    lastName: {
        type: String,
        required: [true, 'Lastname required']

    },
    userName: {
        type: String,
        required: [true, 'Username required']

    },
    password: {
        type: String,
        required: [true, 'Password required']

    },
    email: {
        type: String,
        required: [true, 'Email required']

    },
    birthDate: Date,
    accountNumber: {
        type: Number,
        required: [true, 'Account number required']
    },
    role: {
        type: String,
        required: [true, 'Role has not been selected'],
        enum: ['USER_ROLE', 'ADMIN_ROLE'],
        default: 'USER_ROLE'
    },
    membershipType: {
        type: String,
        enum: ['SILVER', 'GOLD']
    },
    enabled: {
        type: Boolean,
        required: true,
        default: true
    }
},
    {
    timestamps: true
    }
);

module.exports = mongoose.model('users', userSchema);

