import alt from '../alt';
import {assign} from 'underscore';
import AuthStore from './../stores/AuthStore';


class NavbarActions {
  constructor() {
    this.generateActions(
      'updateOnlineUsers',
      'updateAjaxAnimation',
      'updateSearchQuery',
      'getCharacterCountSuccess',
      'getCharacterCountFail',
      'findCharacterSuccess',
      'findCharacterFail'
    );
  }
}

export default alt.createActions(NavbarActions);