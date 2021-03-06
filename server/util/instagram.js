// Instagram api for use by Share Goodness

function ComfyInstagram(config) {

	var ig = require('instagram-node').instagram();

	ig.use({
		client_id: config.client_id
	    , client_secret: config.client_secret
	});

	this.api = ig;

}

ComfyInstagram.prototype.getPosts = function(maxTagId, gotPosts) {

	var allPosts = [];
	var api = this.api;

	var options = maxTagId ? { max_tag_id: maxTagId } : {};

	api.tag_media_recent('sharegoodness', options, function(err, posts, pagination) {

		if (err) {
			return gotPosts(err);
		}

		if (!posts || !posts.length) {
			return gotPosts('No posts found.');
		}

		posts.forEach(function(post){

			if (postNotAlreadyUsed(allPosts, post) && validPost(post)) {

				allPosts.push({
					text: post.caption.text.replace(/#/g, " #").replace(/  /g, " ")
					, image: post.images.standard_resolution.url
					, name: post.user.full_name
					, avatar: post.user.profile_picture
					, link: post.link
					, provider: 'instagram'
					, id: post.id
					, date_posted: new Date(Number(post.created_time + '000'))
				});

			}

		});

		return gotPosts(null, allPosts, pagination.next_max_tag_id);

	});

};

ComfyInstagram.prototype.getPost = function(postId, gotIt) {

	var api = this.api;

	api.media(postId, function(err, post) {

		if (err) {
			gotIt(err);
		}
		else {

			if (!validPost(post)) {
				return gotIt('Not a valid post');
			}
			else {
				gotIt(null, {
					text: post.caption.text.replace(/#/g, " #").replace(/  /g, " ")
					, image: post.images.standard_resolution.url
					, name: post.user.full_name
					, avatar: post.user.profile_picture
					, link: post.link
					, provider: 'instagram'
					, id: post.id
					, date_posted: new Date(Number(post.created_time + '000'))
				});	
			}

		}

	});

};

function validPost(post) {
	return post.type == "image" && post.caption && post.created_time && post.caption.text && post.images && post.images.standard_resolution && post.images.standard_resolution.url && post.user && post.user.full_name && post.user.profile_picture;
}

function postNotAlreadyUsed(posts, newPost) {

	for (var i = 0; i < posts.length; i++) {
		if (posts[i].id == newPost.id) {
			return false;
		}
	};

	return true;

}

module.exports = function(config) {
	return new ComfyInstagram(config);
}