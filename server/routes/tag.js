// Tag Route

// Pass the instagram hub challenge
exports.hubChallenge = function(req, res){
	res.send(req.query['hub.challenge']);
};

// Only allow requets every to seconds for live data
var allowLiveFeedRequest = true;

// Route that gets posted to whenever instagram has new data for #sharegoodness
exports.liveFeed = function(req, res) {

	if (allowLiveFeedRequest) {

		allowLiveFeedRequest = false;

		setTimeout(function(){
			allowLiveFeedRequest = true;
		}, 2000);

		Util.instagram.getFreshPosts(function(err, freshPosts){
			console.log(freshPosts);
		});
	
	}

	res.send();

};