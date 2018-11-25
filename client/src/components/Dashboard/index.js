import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Container from '../ui/Container';
import Emoji from '../Emoji';
import Playlists from '../Playlists';
import getAccessToken from '../../utils/getAccessToken';
import { getUsersOwnPlaylists } from '../../utils/service';
import Button from '../ui/Button';

export default class Dashboard extends Component {
  state = {
    playlist: null,
    redirect: false,
  };
  componentDidMount() {
    getAccessToken(this.props.location.search).then(token => {
      getUsersOwnPlaylists(10, token)
        .then(playlist => this.setState({ playlist }))
        .catch(() => this.setState({ redirect: true }));
    });
  }

  render() {
    const { redirect, playlist } = this.state;
    return redirect ? (
      <Redirect to="/" />
    ) : (
      <Container>
        <h2>
          Who are you today?‍‍‍‍‍ <Emoji symbol="🤷" />
        </h2>
        <p>Pick one playlist that best matches your mood today!</p>
        {playlist && <Playlists items={playlist} />}
        <br />
        <Link to={'/overview'}>
          <Button>Next</Button>
        </Link>
      </Container>
    );
  }
}
