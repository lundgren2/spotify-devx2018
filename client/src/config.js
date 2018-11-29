const BACKEND_URI = window.location.href.includes('localhost')
  ? 'http://localhost:8888'
  : 'https://socify-server.herokuapp.com';

const config = {
  CLIENT_ID: '57553618157440e19f8f0a747dde4acd',
  SPOTIFY_API: 'https://api.spotify.com/v1',
  REDIRECT_URI: 'http://localhost:3000 ',
  BACKEND_URI,
};

export default config;
