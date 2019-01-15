const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    googleId: String,
    facebookId: String,
    instagramId: String,
    twitterId: String,
    linkedInId: String,
    thumbnail: String,
    password: String,
    email: String
});

const User = mongoose.model('user', userSchema);

module.exports = User;