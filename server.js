var restify = require('restify');
var server = restify.createServer();
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

var config = require('./config');
var userController = require('./controller/userController');

server.post('/register', userController.createUser);
server.post('/login', userController.login);
server.post('/logout', userController.logout);

server.get('/users', userController.getUsers);
server.post('/users/:mobile/changePwd', userController.changePwd);
server.listen(config.server.port, config.server.host);

