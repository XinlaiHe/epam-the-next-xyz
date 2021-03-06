// include and setup express
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var _ = require('underscore');
// include express handlebars (templating engine)
var exphbs  = require('express-handlebars');

// specify the layout for our handlebars template
var hbs = exphbs.create({defaultLayout: 'main'});

// crethe the express app
var app = express();

//CONNECT TO MONGODB set the schema
mongoose.connect('mongodb://localhost/epam');

var Schema = mongoose.Schema;
var ArticleSchema = new Schema({
      id : Number,
      title : String,
      summary : String,
      date : Date,
      author : String,
      image : String
});

mongoose.model("Article", ArticleSchema);
var Article = mongoose.model("Article");
// setup handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// express middleware that parser the key-value pairs sent in the request body in the format of our choosing (e.g. json)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// setup our public directory (which will serve any file stored in the 'public' directory)
app.use(express.static('public'));

app.use(function (req, res, next) {
 res.locals.scripts = [];
 next();
});

// respond to the get request with the home page
app.get('/', function (req, res) {

    res.locals.scripts.push('/js/home.js');

    res.render('home');
});
//respond to the post request with the home page
app.post("/", function(req,res){

    Article.find({}, function(err, data){
        req.body.id = Number(data[data.length-1].id + 1);
        var article = new Article(req.body);
        article.save(function(err){
          if(err) throw err;
          else  res.redirect('/');
      });
    });


});
// respond to the get request with the individual article page
app.get('/articles/:id', function (req, res) {

    res.locals.scripts.push('/js/article.js');
    res.render('article');
});
// respond to the get request with the about page
app.get('/about', function(req, res) {
  res.render('about');
});

// respond to the get request with the register page
app.get('/register', function(req, res) {
  res.render('register');
});

// handle the posted registration data
app.post('/register', function(req, res) {

  // get the data out of the request (req) object
  // store the user in memory here

  res.redirect('/dashboard');
});

// respond to the get request with dashboard page (and pass in some data into the template / note this will be rendered server-side)
app.get('/dashboard', function (req, res) {
    res.render('dashboard', {
    	stuff: [{
		    greeting: "Hello",
		    subject: "World!"
		}]
    });
});

// the api (note that typically you would likely organize things a little differently to this)
var api = require('./routes/api');
app.use('/api', api);

// create the server based on express
var server = require('http').createServer(app);

// start the server
server.listen(1337, '127.0.0.1', function () {
  console.log('The Next XYZ is looking good! Open http://localhost:%d to begin.', 1337);
});
