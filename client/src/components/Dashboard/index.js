import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Container from '../ui/Container';
import Emoji from '../Emoji';
import Playlists from '../Playlists';
import getAccessToken from '../../utils/getAccessToken';
import Button from '../ui/Button';
import {
  getUsersOwnPlaylists,
  getTracksInPlaylist,
  getAudioInfo,
} from '../../utils/service';

export default class Dashboard extends Component {
  state = {
    playlist: null,
    redirect: false,
    token: null,
  };
  componentDidMount() {
    getAccessToken(this.props.location.search).then(token => {
      getUsersOwnPlaylists(20, token)
        .then(playlist => this.setState({ playlist: playlist, token: token }))
        .catch(() => this.setState({ redirect: true }));
    });
  }

  render() {

    const { redirect, playlist, token } = this.state;
    return redirect ? (
      <Redirect to="/" />
    ) : (
      <Container>
        <h2>
          Who are you today?‍‍‍‍‍ <Emoji symbol="🤷" />
        </h2>
        <p>Pick one playlist that best matches your mood today!</p>
        {playlist ? <Playlists items={playlist} token={token} /> : null}
        <br />
        <Link to={'/overview'}>
          <Button>Next</Button>
        </Link>
      </Container>
    );
  }
}
