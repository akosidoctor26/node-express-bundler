var _ = require("lodash");
var bundles = {};

function addBundle(path, files, env) {
	//All are required
	if(!path || !files || !env) return;
	
	//If bundles[env] doesn't exist yet, initialize it with an object
	if(!bundles[env]) bundles[env] = {};
	//If bundles[env][path] doesn't exist yet, initialize the path array
	if(!bundles[env][path]) bundles[env][path] = [];		
	
	if(_.isString(files)) {
		if(!_.contains(bundles[env][path], files))
			bundles[env][path].push(files);
	}
	else if(_.isArray(files)) {
		_.each(files, function(file) {
			if(!_.contains(bundles[env][path], file))
				bundles[env][path].push(file);
		});
	}
}

module.exports = {
	addScriptBundle: addBundle,
	addStyleBundle: addBundle,
	setup: function(env) {
		return function(req, res, next) {
			res.locals.outputScriptBundle = function(path) {
				if(!path || !env) return;
				
				return "<script type='text/javascript' src='"
				+ bundles[env][path].join("'></script><script type='text/javascript' src='")
				+ "'></script>";
			};
			
			res.locals.outputStyleBundle = function(path) {
				if(!path || !env) return;
				
				return "<link rel='stylesheet' href='"
				+ bundles[env][path].join("'/>" + "<link rel='stylesheet' href='")
				+ "'/>";
			};
			
			next();
		};
	}
}