
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080


var create = require('./lib/server');

(function read() {
	var server = create.createServer();
	server.listen(server_port);
	})();