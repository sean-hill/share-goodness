// Configuration file

// Shared configuration between dev and prod here
Conf = {
	ogTags: {
		title: 'Some coolness'
		, site_name: 'Share Goodness'
		, description: 'Some cool description.'
	}
	, seoTags: {
		title: 'Some coolness'
		, description: 'Some cool description.'
	}
	, instagram: {
		client_id: '67ab2eef9e6c4f6cb7bc81f6a2c92d99'
		, client_secret: '9ec241e9a828406d926d704fc447f4fb'
	}
}

// Dev configuration here
if (process.env.NODE_ENV === 'development') {

	Conf.mongo_config = {
		'dbname' : 'share_goodness',
		'host' : 'kahana.mongohq.com',
		'port' : 10018,
		'auth' : {
			'name': 'share_goodness_admin',
			'pass': 'Thehills11'
		},
		connect_string: function(){
			return 'mongodb://' + this.auth.name + ':' + this.auth.pass + '@' + this.host + ':' + this.port + '/' + this.dbname;
		}
	};

}

// Prod configuration here
if (process.env.NODE_ENV === 'production') {

	Conf.mongo_config = {
		'dbname' : 'share_goodness',
		'host' : 'kahana.mongohq.com',
		'port' : 10018,
		'auth' : {
			'name': 'share_goodness_admin',
			'pass': 'Thehills11'
		},
		connect_string: function(){
			return 'mongodb://' + this.auth.name + ':' + this.auth.pass + '@' + this.host + ':' + this.port + '/' + this.dbname;
		}
	};

}

module.exports = Conf;