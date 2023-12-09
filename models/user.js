const mongoose = require('mongoose');
const passportLocalMOngoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,   // String is shorthand for {type: String}
        unique: true, // this will make sure that the email is unique
        required: true  // this will make sure that the email is required
    }
});

userSchema.plugin(passportLocalMOngoose);

module.exports = mongoose.model('User', userSchema);