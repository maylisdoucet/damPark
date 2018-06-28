import React from 'react';
import Entrance from '../images/Entrance.svg';

const Loading = {
  render() { 
    return (
      <div>
        <img
          src={Entrance}
          width="100%"
          height="auto"
          alt="logo_park"
        />
      </div>
    );
  },
};

export default Loading;
