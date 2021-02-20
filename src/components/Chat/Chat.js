import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css';
import '../Input/Input.css';
import InfoBar from './../InfoBar/InfoBar';
import Messages from './../Messages/Messages';
import TextContainer from './../TextContainer/TextContainer';
let socket;
const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'https://chat-app9798.herokuapp.com/';
  var connectionOptions = {
    'force new connection': true,
    reconnectionAttempts: 'Infinity',
    timeout: 10000,
    transports: ['websocket'],
  };

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io.connect(ENDPOINT, connectionOptions);
    setName(name);
    setRoom(room);
    // console.log(socket);
    socket.emit('join', { name, room });
    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [ENDPOINT, location.search]);
  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });
    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });
  }, []);
  //function for sending messages
  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };
  console.log(message, messages);
  return (
    <div className='outerContainer'>
      <div className='container'>
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <form className='form'>
          <input
            className='input'
            type='text'
            placeholder='Type a message'
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyPress={(event) =>
              event.key === 'Enter' ? sendMessage(event) : null
            }
          />
          <button className='sendButton' onClick={(e) => sendMessage(e)}>
            Send
          </button>
        </form>
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
