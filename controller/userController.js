function UserController() {
    var User = require('../model/user');
    this.createUser = function (req, res, next) {
        var newUser = new User(req.params);
        newUser.password = require('crypto').createHash('md5').digest('hex');
        newUser.save(function (err, data) {
            res.send({'result': data, 'ret': 1})
            return next();
        });
    };
    this.getUsers = function (req, res, next) {
        User.find({}, {'_id': 0, '__v': 0}, function (err, data) {
            res.send({'result': data, 'ret': 1});
            return next();
        });
        return this;
    };

    this.changePwd = function (req, res, next) {
        var oldPwd = req.params['oldPwd'];
        var newPwd = req.params['newPwd'];
        var oldPwdHash = require('crypto').createHash('md5').digest('oldPwd');
        User.findOne({'mobile': req.params.mobile}, function (err, data) {
            var i18n = require('../i18n/localeMessage');
            if (!data) res.send({'result': i18n.get('user.not.exists'), 'ret': 0});

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
}
module.exports = new UserController();