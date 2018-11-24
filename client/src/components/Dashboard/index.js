import { SpotifyGraphQLClient } from 'spotify-graphql';
import config from '../../utils/config';

import React from 'react';

export default () => {
  return <div />;
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
