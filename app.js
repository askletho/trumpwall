
var http = require('http');
var express = require('express'); // Express framework
var config = require('./config'); // App config
var Twit = require('twit'); // Twitter API package


// Express init
var app = express();

// Server init
var server = http.createServer(app);

// Twit init
var T = new Twit({
  consumer_key:         config.twitter.consumer_key,
  consumer_secret:      config.twitter.consumer_secret,
  access_token:         config.twitter.access_token,
  access_token_secret:  config.twitter.access_token_secret
});

// Port web app
const PORT=config.web.port;
const TRUMP_ID = 'realDonaldTrump';

// Loading the last tweet of Trump
var options = { screen_name: TRUMP_ID, count: 1 };
var htmlTweet = "";
T.get('statuses/user_timeline', options , function(err, data) {
	htmlTweet += data[0].text;
})

// Routes
app.get('/', function(req, res) {
	res.render('pages/index.ejs', {content: htmlTweet, server_port: PORT});
})
.get('/about', function(req, res) {
	res.render('pages/about.ejs');
})

// Middlewares
.use(express.static(__dirname + '/public')); // Tells that the 'public' folder contains static files

// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand un client se connecte, on affiche une notification dans la console
io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !');
    // On envoie des messages à tous les clients à chaque nouveau tweet de D. Trump
    // Stream used for tests : var stream = T.stream('statuses/filter', { track: 'banana' })
	var stream = T.stream('user', { screen_name: TRUMP_ID, with: "user" } )
	stream.on('tweet', function (tweet) {
		socket.broadcast.emit('message', tweet.text);
	})
});


// Starting server
server.listen(PORT);