import alt from '../alt';
import AuthStore from './../stores/AuthStore';

var config = require('./../../config');
var rdToWgs = require('rdtowgs');
var googleMapsClient = require('@google/maps').createClient({
  key: config.apiKey
});

class MapActions {
  constructor() {
    this.generateActions(
        'addInfoWindow',
        'setSpecialMarker',
        'closeSpecialMarker'
    );
  }

  addSpecialMarker(markerInfo){
    const that = this;
    googleMapsClient.reverseGeocode({
      latlng: [markerInfo.lat, markerInfo.lng]
    }, function (err, response) {
      that.actions.setSpecialMarker({lat: markerInfo.lat, lng: markerInfo.lng, subarea: markerInfo.subarea, location: response.json.results[0].formatted_address});
    });
  }

}

export default alt.createActions(MapActions);