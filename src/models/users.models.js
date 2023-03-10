const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');

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
        required: [true, 'Username required'],
        unique: true

    },
    password: {
        type: String,
        required: [true, 'Password required']

    },
    email: {
        type: String,
        required: [true, 'Email required'],
        unique: true

    },
    birthDate: Date,
    role: {
        type: String,
        required: [true, 'Role has not been selected'],
        enum: ['USER_ROLE', 'ADMIN_ROLE'],
        default: 'USER_ROLE'
    },
    membershipType: {
        type: String,
        enum: ['SILVER', 'GOLD'],

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

userSchema.plugin(uniqueValidator, {message: 'already exists in DB.'});
userSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('users', userSchema);

