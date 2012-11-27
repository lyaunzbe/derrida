
/**
 * Module dependencies.
 */

var express = require('express')
  , pjax = require('express-pjax')
  , routes = require('./routes')

var app = module.exports = express();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
  app.use(pjax());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

//app.get('/1', routes.index);
//app.get('/2', routes.dinosaurs);
//app.get('/3', routes.aliens);

var x = app.listen(3117, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  
});
