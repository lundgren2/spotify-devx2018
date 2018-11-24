import React from 'react';
import { SpotifyGraphQLClient } from 'spotify-graphql';
import config from '../../utils/config';
import Container from '../ui/Container';
import { Select } from '@smooth-ui/core-em';
import Emoji from '../Emoji';
import List from '../ui/List';

export default () => {
  return (
    <Container>
      <h2>
        Who are you today?‍‍‍‍‍ <Emoji symbol="🤷" />
      </h2>
      <p>Pick one playlist that best matches your mood today!</p>
      <List />
      {/* <Select size="lg" placeholder="Large">
        <option value="amazing">Happy playlist</option>
        <option value="great">Sad playlist</option>
      </Select> */}
    </Container>
  );
};

SpotifyGraphQLClient(config)
  .query(
    `
  {
    user(id: "11879785") {
      playlists {
        name
        tracks {
          track {
            id
            name
          }
        }
      }
    }
  }
`
  )
  .then(executionResult => {
    if (executionResult.errors) {
      console.log('error');
      console.error(JSON.stringify(executionResult.errors));
    } else {
      console.log('success');
      console.log(JSON.stringify(executionResult.data));
    }
  });
