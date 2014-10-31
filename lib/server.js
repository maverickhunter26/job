var restify = require('restify');
var url = require('url');
var qs = require('querystring');
var validator = require('validator');
var datahandler = require('./datalayer');


function createServer() {

	var server = restify.createServer({
		name:'jobs'
	});
	server.use(restify.queryParser({ mapParams: false }));
	server.use(restify.bodyParser());
	server.post('/savePosting', savePosting);
	server.get('/getPostings', getPostings);
	//server.use(restify.acceptParser(server.acceptable));


	server.get('/',function root(req,res,next){
		res.send(200,'Incorrect Url');
		next();
	});

	return server;
}

function savePosting(req,res,next) {
	var data = req.params;
	//console.log('data>>>>>>>>>>>' + data)
	datahandler.save(data,res);
		
	/*response.writeHead(200, {'Content-Type': 'text/plain'});
  	response.end('Hello dis World\n');
	next();*/
}

function getPostings(req,res,next) {

	datahandler.search(req,res,next);

	/*response.writeHead(200, {'Content-Type': 'text/plain'});
  	response.end('Hello dis World\n');
	next();*/
}

module.exports = {
    createServer: createServer
};