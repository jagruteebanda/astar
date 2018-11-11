import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import './App.css';

import Home from './Components/Home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Redirect to="/home" />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;