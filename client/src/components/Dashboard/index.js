import React, { Component } from 'react';
import { SpotifyGraphQLClient } from 'spotify-graphql';
import config from '../../utils/config';
import Container from '../ui/Container';
import Emoji from '../Emoji';
import Playlists from '../Playlists';
import fakePlaylists from './fakePlaylists';
import getAccessToken from '../../utils/getAccessToken';
import { Redirect } from 'react-router-dom';

export default class Dashboard extends Component {
  state = {
    playlists: [],
    token: null,
    redirect: false,
  };
  componentDidMount() {
    getAccessToken(this.props.location.search)
      .then(token => {
        this.setState({ token });
      })
      .catch(() => {
        // redirect to login
        this.setState({ redirect: true });
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

    const { playlists, redirect } = this.state;
    return redirect ? (
      <Redirect to="/" />
    ) : (
      <Container>
        <h2>
          Who are you today?‍‍‍‍‍ <Emoji symbol="🤷" />
        </h2>
        <p>Pick one playlist that best matches your mood today!</p>
        <Playlists items={fakePlaylists.items} />
      </Container>
    );
  }
}
