var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var cors = require('cors');
require('dotenv').config();


var app = express();

app.use(express.static(__dirname + '/public'))
   .use(cors())

app.get('/callback', function(req, res) {

  let code = req.query.code || null;
  let redirect_uri = req.query.redirect_uri || null;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code',
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,

    },
    json: true
  };
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      res.send(
        {
          access_token: body.access_token,
          token_type: body.token_type,
          scope: body.scope,
          expires_in: body.expires_in,
          refresh_token: body.refresh_token,
        }
      );
    } else{
      console.log(response.statusCode);;
      console.log(error);
      res.status(response.statusCode).json({ error: error });
      res.send();

    }
  });

});
// TODO refresh token
// app.get('/refresh_token', function(req, res) {
//
//   // requesting access token from refresh token
//   var refresh_token = req.query.refresh_token;
//   var authOptions = {
//     url: 'https://accounts.spotify.com/api/token',
//     headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
//     form: {
//       grant_type: 'refresh_token',
//       refresh_token: refresh_token
//     },
//     json: true
//   };
//
//   request.post(authOptions, function(error, response, body) {
//     if (!error && response.statusCode === 200) {
//       var access_token = body.access_token;
//       res.send({
//         'access_token': access_token
//       });
//     }
//   });
// });

console.log('Listening on 8888');
app.listen(8888);
