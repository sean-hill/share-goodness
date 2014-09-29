// Comfy Quizzes Server

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development'
}

process.on("uncaughtException", function(error){

	console.log("Uncaught Error");
	console.log(error);

});

var express = require('express');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Conf = require('./conf');
var Model = require('./model');
var Util = require('./util');
var app = express();
var port = process.env.PORT || 5000;

// App variables
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(cookieParser());

// Api Middlewares
app.use('/post', require('./api/post'));
app.use('/tag', require('./api/tag'));

// Mongoose events
mongoose.connection.on('error', function(err){
  console.log('Mongoose error:', err);
});

mongoose.connection.on('disconnected', function(){
  console.log('Mongoose disconnected!');
});

mongoose.set('debug', true);

mongoose.connect(Conf.mongo_config.connect_string(), { db: { safe:true } }, function(err){
	if (err) {
		throw err;
	}
	else {
		console.log('Mongoose Connected');
	}
});

app.get('/', function(req, res){
	res.send('Share Goodness');
});

// Mixpanel Token
// if (process.env.NODE_ENV === 'development') {
// 	app.locals.mixpanel_token = '5dbe181a621c1eaa993f71cb6d870ada';
// }
// else {
// 	app.locals.mixpanel_token = '17c1aab9a2cb0a181496fe32b1c35d64';	
// }

app.get('*', function(req, res) {
	res.locals.ogTags = Conf.ogTags;
	res.locals.seoTags = Conf.seoTags;
	res.render('index');
});

app.listen(port, function(){
	console.log('Share Goodness listening on port', port);
});

