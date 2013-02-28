var express = require('express'),	
 	app = express.createServer(),
 	io = require('socket.io').listen(app);
 	

if (!module.parent) {
  app.listen(3000);
  console.log("server started at %s", (new Date()).toUTCString());
  console.log("listening on port %d", app.address().port);
}

app.configure(function(){
	app.use(express.methodOverride());
	app.use(express.bodyParser());
	app.use(express.static(__dirname + '/public'));
	app.use(express.errorHandler({
		dumpExceptions: true,
    	showStack: true
  }));
  app.use(app.router);
});


app.get("/", function(req, res) {
  res.redirect("/index.html");
});


/*** socket.io ***/

io.sockets.on('connection', function (socket) {    
  console.log("New client - Game started.");      
  var Game = gamejs.Game;
  var game = new Game();
  
  socket.on('newgame', function(){    
   

    socket.emit();
  
  });


    


    socket.on('disconnect', function(){ console.log("client has disconnected"); });   
});

