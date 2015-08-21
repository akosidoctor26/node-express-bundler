var expect = require("chai").expect;
var bundler = require("../node-express-bundler");

describe("node-express-bundler", function() {
	var res;
	beforeEach(function() {
		res = {locals: {}};
	});
	
	it("should expect script html when script path array is passed", function(done) {
		bundler.addScriptBundle("/path/scripts", 
			["/dist/javascripts/s1.js", "/dist/javascripts/s2.js", "/dist/javascripts/s3.js"], 
			"prod");
		bundler.setup("prod")(null, res, function() {});
		
		expect(res.locals.outputScriptBundle("/path/scripts")).to.be.equal("<script type='text/javascript' src='/dist/javascripts/s1.js'></script>" 
			+ "<script type='text/javascript' src='/dist/javascripts/s2.js'></script>"
			+ "<script type='text/javascript' src='/dist/javascripts/s3.js'></script>");
		done();
	});
	
	it("should expect style html when style path array is passed", function(done) {
		bundler.addStyleBundle("/path/styles", 
			["/dist/stylesheets/ss1.css", "/dist/stylesheets/ss2.css", "/dist/stylesheets/ss3.css"],
			"prod");
		bundler.setup("prod")(null, res, function() {});
		
		expect(res.locals.outputStyleBundle("/path/styles"))
		.to.be.equal("<link rel='stylesheet' href='/dist/stylesheets/ss1.css'/>" 
			+ "<link rel='stylesheet' href='/dist/stylesheets/ss2.css'/>"
			+ "<link rel='stylesheet' href='/dist/stylesheets/ss3.css'/>");
		done();
	});
	
	it("should not add duplicate script file paths", function(done){
		bundler.addScriptBundle("/path/scripts", 
			["/dist/javascripts/s1.js", "/dist/javascripts/s2.js", "/dist/javascripts/s3.js"], 
			"prod");
		bundler.setup("prod")(null, res, function() {});
		
		expect(res.locals.outputScriptBundle("/path/scripts")).to.be.equal("<script type='text/javascript' src='/dist/javascripts/s1.js'></script>" 
			+ "<script type='text/javascript' src='/dist/javascripts/s2.js'></script>"
			+ "<script type='text/javascript' src='/dist/javascripts/s3.js'></script>");
		done();
	});
	
	it("should not add duplicate style file paths", function(done){
		bundler.addStyleBundle("/path/styles", 
			["/dist/stylesheets/ss1.css", "/dist/stylesheets/ss2.css", "/dist/stylesheets/ss3.css"],
			"prod");
		bundler.setup("prod")(null, res, function() {});
		
		expect(res.locals.outputStyleBundle("/path/styles"))
		.to.be.equal("<link rel='stylesheet' href='/dist/stylesheets/ss1.css'/>" 
			+ "<link rel='stylesheet' href='/dist/stylesheets/ss2.css'/>"
			+ "<link rel='stylesheet' href='/dist/stylesheets/ss3.css'/>");
		done();
	});
	
	it("should add one file path to existing script bundle", function(done) {
		bundler.addScriptBundle("/path/scripts", "/dist/javascripts/new.js", "prod");
		bundler.setup("prod")(null, res, function() {});
		expect(res.locals.outputScriptBundle("/path/scripts")).to.be.equal("<script type='text/javascript' src='/dist/javascripts/s1.js'></script>" 
			+ "<script type='text/javascript' src='/dist/javascripts/s2.js'></script>"
			+ "<script type='text/javascript' src='/dist/javascripts/s3.js'></script>"
			+ "<script type='text/javascript' src='/dist/javascripts/new.js'></script>");
		done();
	});
	
	it("should add one file path to style bundles", function(done) {
		bundler.addStyleBundle("/path/styles", "/dist/stylesheets/new.css", "prod");
		bundler.setup("prod")(null, res, function() {});
		expect(res.locals.outputStyleBundle("/path/styles"))
		.to.be.equal("<link rel='stylesheet' href='/dist/stylesheets/ss1.css'/>" 
			+ "<link rel='stylesheet' href='/dist/stylesheets/ss2.css'/>"
			+ "<link rel='stylesheet' href='/dist/stylesheets/ss3.css'/>"
			+ "<link rel='stylesheet' href='/dist/stylesheets/new.css'/>");
		done();
	});

	it("should add script files to same path but different environment", function(done) {
		bundler.addScriptBundle("/path/scripts", 
			["/public/javascripts/s1.js", "/public/javascripts/s2.js", "/public/javascripts/s3.js"], 
			"dev");
			
		bundler.setup("dev")(null, res, function() {});
		expect(res.locals.outputScriptBundle("/path/scripts")).to.be.equal("<script type='text/javascript' src='/public/javascripts/s1.js'></script>" 
			+ "<script type='text/javascript' src='/public/javascripts/s2.js'></script>"
			+ "<script type='text/javascript' src='/public/javascripts/s3.js'></script>");
		
		bundler.setup("prod")(null, res, function() {});
		expect(res.locals.outputScriptBundle("/path/scripts")).to.be.equal("<script type='text/javascript' src='/dist/javascripts/s1.js'></script>" 
			+ "<script type='text/javascript' src='/dist/javascripts/s2.js'></script>"
			+ "<script type='text/javascript' src='/dist/javascripts/s3.js'></script>"
			+ "<script type='text/javascript' src='/dist/javascripts/new.js'></script>");
		done();
	});
	
	it("should add style files to same path but different environment", function(done) {
		bundler.addStyleBundle("/path/styles", 
			["/public/stylesheets/ss1.css", "/public/stylesheets/ss2.css", "/public/stylesheets/ss3.css"],
			"dev");
			
		bundler.setup("dev")(null, res, function() {});
		expect(res.locals.outputStyleBundle("/path/styles"))
		.to.be.equal("<link rel='stylesheet' href='/public/stylesheets/ss1.css'/>" 
			+ "<link rel='stylesheet' href='/public/stylesheets/ss2.css'/>"
			+ "<link rel='stylesheet' href='/public/stylesheets/ss3.css'/>");
		
		bundler.setup("prod")(null, res, function() {});
		expect(res.locals.outputStyleBundle("/path/styles"))
		.to.be.equal("<link rel='stylesheet' href='/dist/stylesheets/ss1.css'/>" 
			+ "<link rel='stylesheet' href='/dist/stylesheets/ss2.css'/>"
			+ "<link rel='stylesheet' href='/dist/stylesheets/ss3.css'/>"
			+ "<link rel='stylesheet' href='/dist/stylesheets/new.css'/>");
		done();
		
	});	
	
	// 
	// it("should", function(done) {
	// 	done();
	// });
});