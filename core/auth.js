function ensureAuthorized(req, res, next) {
    var token = req.headers["authorization"];
    if (typeof token !== 'undefined') {
        req.token = token.split(" ")[1];
        next();
    } else {
        res.send(403);
    }
}