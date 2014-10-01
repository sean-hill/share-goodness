// A Goodness Post Route

exports.get = function(req, res) {

	console.log('Querying for', req.body.maxTagId);

	Util.Instagram.getPosts(req.body.maxTagId, function(err, posts, maxTagId){

		res.status(200).json({ 
			posts: posts
			, maxTagId: maxTagId
		});

	});

};

exports.view = function(req, res) {

	Util.Instagram.getPost(req.params.post_id, function(err, post){
		res.locals = post;
		res.render('view');
	});
	
};