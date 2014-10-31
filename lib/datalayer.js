var mongodb = require('./mongodb');
var validator = require('validator');
var Model = require('./model');


function save(data,res){

	//console.log(JSON.stringify(data));
	var jobModel = new Model.JobModel(data);

	Model.JobModel.where('jobid', data.jobid).findOneAndUpdate(data).setOptions({upsert:true}).exec(function(err,regModel){
		//console.log('inside mongoose save');
		if(err) {
			console.log(err);
			//if(err)
			res.writeHead(500, {'Content-Type': 'text/plain'});
  			res.end('Error!!!\n');
		}

		res.writeHead(200, {'Content-Type': 'text/plain'});
  		res.end('job saved\n');
	});
	
}


/*
{
	"keyword" : "",
	"location" : "",
	"expmin" : "",
	"expmax" : ""
}
*/

function search(req, res,next) {

	var query = Model.JobModel.find({}).select('jobid companyName industry title location salmin salmax responsibility expmin expmax education qualities datePosted validdate');
	if(req.query.keyword && validator.isAlpha(req.query.keyword.replace(' ',''))) {
		//console.log(req.query.keyword);
		query.where('tags',req.query.keyword);
	}
	if(req.query.location && validator.isAlpha(req.query.location.replace(' ',''))) {
		//console.log(req.query.location);
		query.where('location', req.query.location);
	}
	if(req.query.expmin && validator.isNumeric(req.query.expmin)){
		query.where(expmin).lte(req.query.expmin);
		query.where(expmax).gte(req.query.expmin);
	}
	if(req.query.expmax && validator.isNumeric(req.query.expmax)){
		query.where(expmax).gte(req.query.expmax);
		query.where(expmin).lte(req.query.expmax);
	}

	if(req.query.limit && validator.isNumeric(req.query.limit)) {
		query.limit(req.query.limit);
	} else {
		query.limit(20)
	}

	query.exec(function(err, result) {
		if(err){
			res.writeHead(500, {'Content-Type': 'text/plain'});
  			res.end('Error!!!\n');
		}
		res.writeHead(200, {'Content-Type': 'application/json'});
  		res.end(JSON.stringify(result));
		
	});
	/*var para = JSON.parse(data);
	console.log(para.title);
	Model.JobModel.find({companyName : para.title}, function (err, result) {

		if(err) {
			console.log('rewrwe' + err);
			res.writeHead(500, {'Content-Type': 'text/plain'});
  			res.end('Error!!!\n');
		}
		//console.log(result);
		res.writeHead(200, {'Content-Type': 'application/json'});
  		res.end(JSON.stringify(result) + '\n');
	} );*/



}

//require('./model')

exports.save = save;
exports.search = search;