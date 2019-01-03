
var path = require("path");
var express = require("express");
var webpack = require("webpack");
var faker = require("faker");
const socketIO = require('socket.io')
var AccessToken = require("twilio").jwt.AccessToken;
var VideoGrant = AccessToken.VideoGrant;
const http = require('http').Server(express);
const io = socketIO(http)



var app = express();
if(process.env.NODE_ENV === "DEV") { // Configuration for development environment
    var webpackDevMiddleware = require("webpack-dev-middleware");
    var webpackHotMiddleware = require("webpack-hot-middleware");
    var webpackConfig = require("./webpack.config.js");
    const webpackCompiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(webpackCompiler, {
      hot: true
    }));
    app.use(webpackHotMiddleware(webpackCompiler));
    app.use(express.static(path.join(__dirname, "app")));
} else if(process.env.NODE_ENV === "PROD") { // Configuration for production environment
    app.use(express.static(path.join(__dirname, "dist")));
}

app.use(function(req, res, next){
    console.log("Request from: ", req.url);
    next();
})

// Endpoint to generate access token
app.get("/token", function(request, response) {
    var identity = faker.name.findName();

    // Create an access token which we will sign and return to the client,
    // containing the grant we just created
    var token = new AccessToken(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_API_KEY,
        process.env.TWILIO_API_SECRET
    );


    // Assign the generated identity to the token
    token.identity = identity;

    const grant = new VideoGrant();
   // Grant token access to the Video API features
   token.addGrant(grant);

   // Serialize the token to a JWT string and include it in a JSON response
   response.send({
       identity: identity,
       token: token.toJwt()
   });
});
// End of Twilio

io.on('connection', socket => {
  console.log('socket connected')

  socket.on('giventranslation', function(translation){
    console.log(translation)
    io.sockets.emit('whatever', translation)
  })

})
var port = process.env.PORT || 3000;
app.listen(3000, function() {
    console.log("Express server listening on *:" + port);
});
app.listen(3002, function() {
    console.log("Express server listening on *:" + port);
});

http.listen(9000, function(){
    console.log('9000')
})
