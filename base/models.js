const { model, Schema } = require('mongoose');

const Users = model(
    'Users',
    new Schema({
        id: {type: Number, index: true},
        balance: {type: Number, default: 0},
        tokens: {type: Number, default: 0},
        admin: {type: Boolean, default: false},
        ban: {type: Boolean, default: false},
        action: {type: String, default: ''}
    })
);

module.exports = {
    Users
};
