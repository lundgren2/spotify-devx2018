import React, { Component } from 'react';
import { SpotifyGraphQLClient } from 'spotify-graphql';
import config from '../../utils/config';
import Container from '../ui/Container';
import Emoji from '../Emoji';
import Playlists from '../Playlists';
import fakePlaylists from './fakePlaylists';
import getAccessToken from '../../utils/getAccessToken';
import { Redirect } from 'react-router-dom';
import { getUsersOwnPlaylists } from '../../utils/service';

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
    //     SpotifyGraphQLClient(config)
    //       .query(
    //         `
    //   {
    //     user(id: "11879785") {
    //       playlists {
    //         name
    //         tracks {
    //           track {
    //             id
    //             name
    //           }
    //         }
    //       }
    //     }
    //   }
    // `
    // )
    // .then(executionResult => {
    //   if (executionResult.errors) {
    //     console.log('error');
    //     console.error(JSON.stringify(executionResult.errors));
    //   } else {
    //     console.log('success');
    //     this.setState({ playlists: executionResult.data.user.playlists });
    //     console.log(JSON.stringify(executionResult.data));
    //   }
    // });

    const { redirect, playlist } = this.state;
    return redirect ? (
      <Redirect to="/" />
    ) : (
      <Container>
        <h2>
          Who are you today?‍‍‍‍‍ <Emoji symbol="🤷" />
        </h2>
        <p>Pick one playlist that best matches your mood today!</p>
        {playlist ? <Playlists items={playlist} /> : null}
      </Container>
    );
  }
}
