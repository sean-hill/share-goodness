// Tag Api Routes

var express		= require('express');
var tagRoute	= require('../routes/tag');
var tagApi 	= express.Router();

tagApi.get('/sharegoodness', tagRoute.hubChallenge);
tagApi.post('/sharegoodness', tagRoute.liveFeed);

module.exports = tagApi;