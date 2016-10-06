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
        this.specialmarker = {};
    }


    onAddInfoWindow(infoWindow) {
        this.infoWindow = infoWindow;
    }

    onSetSpecialMarker(markerInfo) {
        this.specialmarker = {
            lat: markerInfo.lat,
            lng: markerInfo.lng,
            subarea: markerInfo.subarea,
            location: markerInfo.location
        }
    }

    onCloseSpecialMarker() {
        this.specialmarker = {};
    }
}

export default alt.createStore(MapStore);