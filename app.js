
var express = require('express'); // Express framework
var config = require('./config'); // App config
var favicon = require('serve-favicon'); // Favicon middleware
var Twit = require('twit'); // Twitter API package


// Express init
var app = express();

// Twit init
var T = new Twit({
  consumer_key:         config.twitter.consumer_key,
  consumer_secret:      config.twitter.consumer_secret,
  access_token:         config.twitter.access_token,
  access_token_secret:  config.twitter.access_token_secret
});

// Port web app
const PORT=config.web.port;

// Last Trump tweet
var options = { screen_name: 'realDonaldTrump', count: 1 };
var htmlTweet = "";
T.get('statuses/user_timeline', options , function(err, data) {
	htmlTweet += data[0].text;
})


// Test live tweets
// var stream = T.stream('statuses/filter', { track: 'mango' })
// stream.on('tweet', function (tweet) {
//   console.log(tweet)
// })


// Sending main page of the web app
app.get('/', function(req, res) {
	res.render('pages/index.ejs', {content: htmlTweet});
})

.get('/about', function(req, res) {
	res.render('pages/about.ejs');
})

// .get('/tweet/:tweetid', function(req, res) {
// 	res.render('tweet.ejs', {tweetid: req.params.tweetid});
// })

// Middlewares
.use(express.static(__dirname + '/public')) // Tells that the 'public' folder is... public *wow*
.use(favicon(__dirname + '/public/favicon.ico')); // Activate the Trump favicon

// .use(function(req, res, next){
// 	res.setHeader('Content-Type', 'text/plain');
// 	res.send(404, 'Page introuvable !');
// });

// Starting app
app.listen(PORT);