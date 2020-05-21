import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Home from './Home';
import UserData from './UserData';

import '../styles/styles.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/userData" component={UserData}/>
        <Redirect to="/" />
      </Switch>
      <a className="center" href="https://mikenichols.xyz/">Made by Mike Nichols</a>
    </Router> 
  );
}

export default App;