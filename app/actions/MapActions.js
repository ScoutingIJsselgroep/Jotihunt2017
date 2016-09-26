import alt from '../alt';
import AuthStore from './../stores/AuthStore';


class MapActions {
  constructor() {
    this.generateActions(
        'addInfoWindow'
    );
  }


}

export default alt.createActions(MapActions);