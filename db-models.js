const mongoose = require('mongoose'),
bcrypt = require('bcrypt'),
Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    googleId: String,
    facebookId: String,
    instagramId: String,
    twitterId: String,
    linkedInId: String,
    thumbnail: String,
    passwordHash: String,
    email: String
});

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.passwordHash);
  };
  
  userSchema.virtual("password").set(function(value) {
    this.passwordHash = bcrypt.hashSync(value, 12);
  });

const User = mongoose.model('user', userSchema);

module.exports = User;