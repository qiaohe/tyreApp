var mongoose = require('../core/db').mongoose;
var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    mobile: String,
    registerDate: Date,
    status: Boolean,
    admin: Boolean,
    token: String
});
var User = mongoose.model('user', userSchema);
module.exports = User;

