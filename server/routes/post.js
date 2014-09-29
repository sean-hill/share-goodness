// A Goodness Post Route

var async = require('async');

exports.getPosts = function(req, res) {

	console.log('Querying for', req.body.maxTagId);

	Util.Instagram.getPosts(req.body.maxTagId, function(err, posts, maxTagId){

		res.status(200).json({ 
			posts: posts
			, maxTagId: maxTagId
		});
		
		// async.eachSeries(posts, function(post, nextPost){

		// 	insertPost(post, function(err){
		// 		if (err) {
		// 			console.log(err);
		// 		}
		// 		return nextPost();
		// 	});

		// }, function(){
			
		// });

	});

};

function insertPost(post, inserted) {

	Model.Post.findOne({ provider: post.provider, id: post.id}, '_id', function(err, existingPost){

		if (existingPost) {
			return inserted('The post from \'' + post.provider + '\' with id \'' + post.id + '\' already exists.');
		}
		else {
			new Model.Post(post).save(inserted);
		}

	});

};