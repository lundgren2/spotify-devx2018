import React, { Component } from 'react';
import queryString from 'query-string';
import axios from 'axios';
require('dotenv').config();

const base = 'https://accounts.spotify.com/authorize';
const client_id = '167d9bf647524ef28ea579584c33e6bb';
const response_type = 'code';
const redirect_uri = 'http://localhost:3000/callback';
// const scope = ''; // to be added
const URL = `${base}/?client_id=${client_id}&response_type=${response_type}&redirect_uri=${redirect_uri}`;

class Login extends Component {
  componentDidMount() {
    const queryParams = this.props.location.search;
    const parsed = queryString.parse(queryParams);
    console.log(process.env.CLIENT_ID);
    axios.get('http://localhost:8888/callback', {
        params: {
          code: parsed.code,
          redirect_uri: redirect_uri,
        },
      })
      .then(json => {
        // handle tokens
        console.log(json);
      })
      .catch(error => {
        console.log(error);
      });
  }
  handleClick = () => {
    console.log('click');
  };
  render() {
    return <a href={URL}>Login</a>;
  }
}
export default Login;
