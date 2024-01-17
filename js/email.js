const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    }
});

const Email = mongoose.model('Email', userSchema);
module.exports = Email;