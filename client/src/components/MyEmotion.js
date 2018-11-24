import React from 'react';
import Emoji from './Emoji';

const MyEmotion = ({ emoji, color }) => {
  const style = {
    container: {
      width: '100%',
      height: '100vh',
      position: 'absolute',
      zIndex: 999,
      background: color,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      verticalAlign: 'middle',
      fontSize: '670%',
    },
  };
  return (
    <div style={style.container}>
      <Emoji symbol={emoji} />
    </div>
  );
};

export default MyEmotion;
