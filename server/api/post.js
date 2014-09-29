// Post Api Routes

var express		= require('express');
var postsRoute	= require('../routes/post');
var postsApi 	= express.Router();

postsApi.post('/test', postsRoute.getPosts);

module.exports = postsApi;