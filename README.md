# node-express-bundler
Middleware for bundling stylesheets and scripts to view

##Installation
```
npm install node-express-bundler
```

##Usage
```
var expressBundler = require("node-express-bundler");

expressBundler.addScriptBundle("/path/scripts", 
			["/dist/javascripts/s1.js", "/dist/javascripts/s2.js", "/dist/javascripts/s3.js"], 
			"prod");
expressBundler.addScriptBundle("/path/scripts", 
			["/development/javascripts/s1.js", "/development/javascripts/s2.js", "/development/javascripts/s3.js"], 
			"dev");

//Can switch scripts and styles between different environment by specifying the environment
app.use(expressBundler.setup("prod"));
```

Then call outputScriptBundle in template engine

```
//jade
!= outputBundle("/path/scripts")
```

Output when prod
```
"<script type='text/javascript' src='/dist/javascripts/s1.js'></script><script type='text/javascript' src='/dist/javascripts/s2.js'></script><script type='text/javascript' src='/dist/javascripts/s3.js'></script>"
```

Output when dev
```
app.use(expressBundler.setup("dev"));
```
```
"<script type='text/javascript' src='/development/javascripts/s1.js'></script><script type='text/javascript' src='/development/javascripts/s2.js'></script><script type='text/javascript' src='/development/javascripts/s3.js'></script>"
```

##Api
path (string)
filePaths (array | string)
env (string)

###addScriptBundle(path, filePaths, env)
  - returns nothing
  
###outputScriptBundle(path)
  - returns html script string
  - to be called as function in the template engine
  
###addStyleBundle(path, filePaths, env)
  - returns nothing
  
###outputStyleBundle(path)
  - returns html style string
  - to be called as function in the template engine
  
###setup(env)
  - middleware function
  - `app.use(expressBundler.setup("prod"))`

