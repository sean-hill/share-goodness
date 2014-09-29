// Scraped Image Schema

var mongoose = require('mongoose')
   , Schema = mongoose.Schema
   , ObjectId = Schema.ObjectId;

var post = new Schema({
	created:  		{ type: Date, default: Date.now }  
	, text: 		String
	, image: 		String
	, name: 		String
	, avatar: 		String
	, link: 		String
	, id: 			String
	, provider: 	String
	, date_posted:  Date
});

module.exports = mongoose.model('Post', post);
