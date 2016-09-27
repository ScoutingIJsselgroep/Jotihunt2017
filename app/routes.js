import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Stats from './components/Stats';
import AddHint from './components/AddHint';
import MapHint from './components/MapHint';
import ListHint from './components/ListHint';
import ListGroup from './components/ListGroup';
import MapGroup from './components/MapGroup';
import Home from './components/Home';
import MapCars from './components/MapCars';
var { loggedIn } = require('./helpers/AuthService');

var config = require('./../config');

const requireAuth = (nextState, replace) => {
    if (!loggedIn()) {
        replace(null, '/');
    }
};

export default (
  <Route component={App}>
    <Route path='/' component={Home} />
    <Route path='/stats' component={Stats} onEnter={requireAuth} />
    <Route path='/hint/add' component={AddHint} onEnter={requireAuth} />
    <Route path='/hint/map' component={MapHint} onEnter={requireAuth} />
    <Route path='/hint/list' component={ListHint} onEnter={requireAuth} />
    <Route path='/groups/map' component={MapGroup} onEnter={requireAuth} />
    <Route path='/groups/list' component={ListGroup} onEnter={requireAuth} />
    <Route path='/cars/map' component={MapCars} onEnter={requireAuth} />
  </Route>
);
