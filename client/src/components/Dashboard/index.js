import React, { Component } from 'react';
import Container from '../ui/Container';
import Emoji from '../Emoji';
import Playlists from '../Playlists';
import { getUsersOwnPlaylists } from '../../utils/service';

export default class Dashboard extends Component {
  state = {
    playlist: null,
  };
  componentDidMount() {
    getUsersOwnPlaylists(20)
      .then(playlist => this.setState({ playlist: playlist }))
      .catch(() => this.setState({ redirect: true }));
  }

  linkToOverview = playlist => {
    this.props.history.push({
      pathname: '/overview',
      state: { playlist: playlist, firstTime: true },
    });
  };

  render() {
    const { playlist } = this.state;
    return (
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
