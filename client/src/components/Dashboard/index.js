import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Container from '../ui/Container';
import Emoji from '../Emoji';
import Playlists from '../Playlists';
import getAccessToken from '../../utils/getAccessToken';
import { getUsersOwnPlaylists } from '../../utils/service';

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

  linkToOverview = playlist => {
    this.props.history.push({
      pathname: '/overview',
      state: { playlist: playlist, token: this.state.token, firstTime: true },
    });
  };

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
        {playlist ? (
          <Playlists linkToOverview={this.linkToOverview} items={playlist} />
        ) : null}
      </Container>
    );
  }
}
