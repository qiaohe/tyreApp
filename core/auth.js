var i18n = require('../i18n/localeMessage');
var config = require('../config');
var jwt =require("jsonwebtoken");
var i18n = require('../i18n/localeMessage');
function ensureAuthorized(req, res, next) {
    var token = req.headers['x-auth-token'];
    if (typeof token !== 'undefined') {
        jwt.verify(token, config.app.tokenSecret, function (err, data) {
            if (err) {
                return res.json({result: i18n.get('token.invalid'), ret: 0});
            } else {
                req.token = data;
                next();
            }
        });
    } else {
        res.send(403, {'result': i18n.get("access.not.authorized"), 'ret': 0});
    }
}
exports.ensureAuthorized = ensureAuthorized;