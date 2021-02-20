import React from 'react';

import onlineIcon from '../InfoBar/icons/onlineIcon.png';

import './TextContainer.css';

const TextContainer = ({ users }) => (
  <div className='textContainer'>
    <div></div>
    {users ? (
      <div>
        <div className='activeContainer'>
          <h2>
            {users.map(({ name }) => (
              <div key={name} className='activeItem'>
                {name}
                <img alt='Online Icon' src={onlineIcon} />
              </div>
            ))}
          </h2>
        </div>
      </div>
    ) : null}
  </div>
);

export default TextContainer;