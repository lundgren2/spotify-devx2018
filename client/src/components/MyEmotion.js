import React from 'react';
import Emoji from './Emoji';

const MyEmotion = props => {
  const { emoji, color, text, playlist, token } = props.location.state;

  const style = {
    container: {
      width: '100vw',
      height: '100vh',
      position: 'relative',
      background: color,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      verticalAlign: 'middle',
      fontSize: '670%',
      textAlign: 'center',
    },
  };

  return (
    <div
      onClick={() => {
        props.history.push({
          pathname: '/overview',
          state: {
            playlist: playlist,
            token: token,
            emoji: emoji,
            color: color,
            text: text,
            firstTime: false,
          },
        });
      }}
    >
      <div style={style.container}>
        <div>
          <Emoji symbol={emoji} style={{ display: 'block' }} />
          <br />
          <h1 style={{ fontSize: 84, color: 'white' }}>{text}</h1>
        </div>
      </div>
    </div>
  );
};

export default MyEmotion;
