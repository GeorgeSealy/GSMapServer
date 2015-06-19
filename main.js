/// <reference path="typings/node/node.d.ts"/>
// main.js

var express = require('express');
var http = require('http');
var fs = require('fs');
var lwip = require('lwip');

var app = express();

// gzip/deflate outgoing responses
var compression = require('compression')
app.use(compression());

// store session state in browser cookie
var cookieSession = require('cookie-session')
app.use(cookieSession({
    keys: ['egroeg', 'rengisde']
}));

// parse urlencoded request bodies into req.body
var bodyParser = require('body-parser')

// create application/json parser 
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser 
var urlencodedParser = bodyParser.urlencoded({ extended: true })

// var serveStatic = require('serve-static')
// app.use(serveStatic)

app.get('/images/:name', function imageService(req, res, next) {
	function serve(path, type) {
		res.writeHead(200, { 'Content-Type': type});
		fs.createReadStream(path).pipe(res);
	}

	var w = 64;
	var h = 64;
	
	if (req.query.w) {
		w = parseFloat(req.query.w);
	}
	
	if (req.query.h) {
		h = parseFloat(req.query.h);
	}
	
	console.log('w x h :' + w + ' x ' + h);
	
	if (req.params.name) {
		var basename = req.params.name;
		var localFilename = __dirname + '/data/images/' + basename + '.jpg';
		
		fs.stat(localFilename, function(err, stat) {
			if (err || !stat.isFile()) {
				res.writeHead(404);
				res.end('Not found: ' + localFilename);
				return;
			}
			
			lwip.open(localFilename, function(err, image) {
			  
			// check err...
			if (err) {
				res.writeHead(404);
				res.end("Can't open: " + localFilename);
				return;
			} else {
				var cacheFilename = 'cache/images/' + basename + '.png';
				
				  // define a batch of manipulations and save to disk as JPEG:
				  image.batch()
				    //.scale(0.5)          // scale to 75%
				    .resize(w, h)          
				    .writeFile(cacheFilename, function(err){
				    	if (err) {
				    		console.log('Write error: ' + err);
				    	} else {
							serve(cacheFilename, 'image/png');
						}
				      // check err...
				      // done.
				  	});
				}
			});
		});
	}
	// res.writeHead(200, {"Content-Type": "text/plain"});
	
	// if (req.params.name) {
	// 	res.write('Image name: ' + req.params.name + '\n');
	// }
	
	// if (req.query != null) {
	//     res.write(JSON.stringify(req.query, null, 2));
	// 	res.write('\n');
	// } else {
	// 	res.write('No params!\n');
	// }
    // res.end();
	// next();
});

// respond to all requests
app.use(function(req, res){
	res.writeHead(404);
	
  	res.end('Not Found!\n');
});

//create node.js http server and listen on port
http.createServer(app).listen(3000);