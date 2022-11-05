const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');

const accountSchema = new Schema({

    cvu: {
        type: String,
        required: [true, 'CVU required (from Mongoose)']
    },
    aliasOwner: {
        type: String,
        required: [true, 'aliasOwner required (from Mongoose)']

    },
    balance: {
        type: Number,
        required: [true, 'missing balance from mongodb'],
        default: 0

    },
    currency: {
        type: String,
        required: [true, 'Currency type required (from Mongoose)'],
        enum: ['USD', 'EUR']
    },
    points: {
        type: Number,
        required: [true, 'points required (from Mongoose)'],
        default: 0

    },
    createdAt: {
        type: Date,
        required: [true, 'createdAt required (from Mongoose)'],
        default: Date.now
    }
}
);

//accountSchema.plugin(uniqueValidator, {message: 'already exists in DB.'});
accountSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('accounts', accountSchema);
