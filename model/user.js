var mongoose = require('../core/db').mongoose;
var userSchema = new mongoose.Schema({
    userName: String,
    password: String,
    email: String,
    mobile: String,
    registerDate: Date,
    status: Boolean,
    admin: boolean,
    token: String
});
var User = mongoose.model('user', userSchema);
module.exports = User;

