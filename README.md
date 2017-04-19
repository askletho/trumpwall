# A Trump Wall

A Trump Wall is a small web application coded with Node.js.

It displays last twitter posts of Donald Trump in real time.

Installation
-------------------
```
npm install
```
Start the app
-------------------
```
node app.js
```

Config file
-------------------
The config file syntax is as follows and must be placed in the root of application.
```
var config = {};

config.twitter = {};
config.web = {};

config.twitter.consumer_key = "xxxxxxx";
config.twitter.consumer_secret = "xxxxxxx";
config.twitter.access_token = "xxxxxxx";
config.twitter.access_token_secret = "xxxxxxx";
config.web.port = 8080;

module.exports = config;
```
