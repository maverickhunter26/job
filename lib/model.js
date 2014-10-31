var mongoose = require('mongoose');

var jobSchema = new mongoose.Schema({
	jobid : {type:String, unique:true},
	companyName : String,
	industry    : String,
	title : String,
	location : String,		
	salmin : String,
	salmax : String,
	responsibility : String,
	expmin : String,
	expmax : String,
	education : String,
	qualities : String,
	datePosted : String,
	validdate : String,
	tags : [String],
	industry : String
});

var JobModel = mongoose.model('jobs', jobSchema);

exports.JobModel = JobModel;