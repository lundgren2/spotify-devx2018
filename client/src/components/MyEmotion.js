import React from 'react';
import Emoji from './Emoji';

const MyEmotion = props => {
  const { emoji, color, text, toggleEmoji } = props;

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
      fontSize: '600%',
      textAlign: 'center',
      zIndex: 99999,
    },
  };

  return (
    <div
      onClick={() => {
        toggleEmoji();
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
