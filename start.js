


var create = require('./lib/server');

(function read() {
	var server = create.createServer();
	server.listen(8080);
	})();