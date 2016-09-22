import alt from '../alt';
import MapActions from '../actions/MapActions';
var config = require('./../../config');

class MapStore {
  constructor() {
    this.bindActions(MapActions);
    this.infoWindow = [];
    this.zoomLevel = config.map.center.zoom;
    this.wsgx = config.map.center.lat;
    this.wsgy = config.map.center.lng;
  }

  onAddInfoWindow(infoWindow) {
    this.infoWindow = infoWindow;
  }
}

export default alt.createStore(MapStore);