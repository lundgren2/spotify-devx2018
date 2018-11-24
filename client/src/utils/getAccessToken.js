import queryString from 'query-string';
import axios from 'axios';

const redirect_uri = 'http://localhost:3000/dashboard';

async function getAccessToken(queryParams) {
  const parsed = queryString.parse(queryParams);
  try {
    let tokens = await axios.get('http://localhost:8888/callback', {
      params: {
        code: parsed.code,
        redirect_uri: redirect_uri,
      },
    });
    return tokens;
  } catch (error) {
    console.log(error);
  }
}

export default getAccessToken;
