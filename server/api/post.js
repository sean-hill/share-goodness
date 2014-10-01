// Post Api Routes

var express		= require('express');
var postsRoute	= require('../routes/post');
var postsApi 	= express.Router();

postsApi.get('/get', postsRoute.get);
postsApi.post('/get', postsRoute.get);
postsApi.get('/view/:post_id', postsRoute.view)

module.exports = postsApi;