import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Stats from './components/Stats';
import Character from './components/Character';
import CharacterList from './components/CharacterList';
import AddHint from './components/AddHint';
import MapHint from './components/MapHint';
import ListHint from './components/ListHint';
import ListGroup from './components/ListGroup';
import MapGroup from './components/MapGroup';
import MapCars from './components/MapCars';

export default (
  <Route component={App}>
    <Route path='/' component={AddHint} />
    <Route path='/stats' component={Stats} />
    <Route path='/characters/:id' component={Character} />
    <Route path='/hint/add' component={AddHint} />
    <Route path='/hint/map' component={MapHint} />
    <Route path='/hint/list' component={ListHint} />
    <Route path='/groups/map' component={MapGroup} />
    <Route path='/groups/list' component={ListGroup} />
    <Route path='/cars/map' component={MapCars} />
    <Route path=':category' component={CharacterList}>
      <Route path=':race' component={CharacterList}>
        <Route path=':bloodline' component={CharacterList} />
      </Route>
    </Route>
  </Route>
);
