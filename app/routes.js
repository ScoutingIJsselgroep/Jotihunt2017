import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Stats from './components/Stats';
import Character from './components/Character';
import CharacterList from './components/CharacterList';
import AddHint from './components/AddHint';
import MapHint from './components/MapHint';

export default (
  <Route component={App}>
    <Route path='/' component={AddHint} />
    <Route path='/stats' component={Stats} />
    <Route path='/characters/:id' component={Character} />
    <Route path='/hint/add' component={AddHint} />
    <Route path='/hint/map' component={MapHint} />
    <Route path=':category' component={CharacterList}>
      <Route path=':race' component={CharacterList}>
        <Route path=':bloodline' component={CharacterList} />
      </Route>
    </Route>
  </Route>
);
