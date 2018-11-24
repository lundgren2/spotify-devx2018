import React, { Component } from 'react';
import { SpotifyGraphQLClient } from 'spotify-graphql';
import config from '../../utils/config';
import Container from '../ui/Container';
import Emoji from '../Emoji';
import Playlists from '../Playlists';
import fakePlaylists from './fakePlaylists';

export default class Dashboard extends Component {
  state = {
    playlists: [],
  };
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
    const { playlists } = this.state;
    return (
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
