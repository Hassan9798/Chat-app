import React from 'react';

import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path='/' exact component={Join} />
        <Route path='/chat' component={Chat} />
      </Switch>
    </HashRouter>
  );
}

export default App;
