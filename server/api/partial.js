// Quiz Api Routes

var express 	= require('express');
var partialApi 	= express.Router();

partialApi.get('/:name', function(req, res){
	res.render('partials/' + req.params.name);
});

module.exports = partialApi;