var config = require('../config');
var i18n = require('../i18n/localeMessage');
function UserController() {
    var User = require('../model/user');
    this.createUser = function (req, res, next) {
        var newUser = new User(req.params);
        newUser.password = require('crypto').createHash('md5').update(req.params.password).digest('hex');
        newUser.token = require("jsonwebtoken").sign({username: newUser.username, password: newUser.password}, config.app.tokenSecret);
        newUser.mobile = newUser.username;
        newUser.save(function (err, data) {
            res.send({'result': data, 'ret': 1})
            return next();
        });
    };
    this.getUsers = function (req, res, next) {
        User.find({}, {'__v': 0}, function (err, data) {
            res.send({'result': data, 'ret': 1});
            return next();
        });
        return this;
    };

    this.changePwd = function (req, res, next) {
        var oldPwd = req.params['oldPwd'];
        var newPwd = req.params['newPwd'];
        var oldPwdHash = require('crypto').createHash('md5').update(oldPwd).digest('hex');
        User.findOne({'mobile': req.params.mobile}, function (err, data) {
            if (data['password'] !== oldPwdHash) {
                res.send({'result': i18n.get('user.old.password.error'), 'ret': 0});
                return next();
            }
            var newPwdHash = require('crypto').createHash('md5').update(newPwd).digest('hex');
            User.update({'mobile': req.params.mobile}, {'password': newPwdHash}, function (err, data) {
                res.send({'result': data, 'ret': 1});
                return next();
            })
        })
    }

    this.login = function (req, res, next) {
        var userName = req.params.username;
        var password = require('crypto').createHash('md5').update(req.params.password).digest('hex');
        User.findOne({'username': userName, password: password}, function (err, data) {
            if (data === null) {
                res.send({'result': i18n.get('user.login.invalid.us.usernameOrPassword'), 'ret': 0})
                next();
            }
            var token = require("jsonwebtoken").sign({'username': userName, password: password}, config.app.tokenSecret);
            User.update({'username': req.params.username}, {'token': token}, function (err, data) {
                res.send({'result': {uid: data._id, token: token}, 'ret': 1});
                return next();
            });
        });
    };
    this.logout = function (req, res, next) {
        var token = req.req.headers["authorization"].split(" ")[1];
        User.update({'token': token}, {'token': token}, function (err, data) {
            res.send({'result': i18n.get('user.logout.success'), 'ret': 1});
            return next();
        });
    }

}
module.exports = new UserController();