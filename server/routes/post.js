// A Goodness Post Route

exports.getPosts = function(req, res) {

	console.log('Querying for', req.body.maxTagId);

	Util.Instagram.getPosts(req.body.maxTagId, function(err, posts, maxTagId){

		res.status(200).json({ 
			posts: posts
			, maxTagId: maxTagId
		});

	});

};