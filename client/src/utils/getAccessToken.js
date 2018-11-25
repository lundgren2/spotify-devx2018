import queryString from 'query-string';
import axios from 'axios';
import config from '../config';

async function getAccessToken(queryParams) {
  const parsed = queryString.parse(queryParams);
  const token = localStorage.getItem('token');
  if (token) {
    return token;
  }
  try {
    let tokens = await axios.get('http://localhost:8888/callback', {
      params: {
        code: parsed.code,
        redirect_uri: config.REDIRECT_URI,
      },
    });
    const token = tokens.data.access_token;
    localStorage.setItem('token', token);
    return tokens.data.access_token;
  } catch (error) {
    console.log(error);
  }
}

export default getAccessToken;
