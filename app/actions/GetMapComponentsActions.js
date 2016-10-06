import alt from '../alt';
import AuthStore from './../stores/AuthStore';


var kml = require('gtran-kml-data');
kml.setPromiseLib(require('bluebird'));

var path = require('path');
var config = require('./../../config');

class GetMapComponentsActions {
    constructor() {
        this.generateActions(
            'mapComponentLoaded',
            'filteredMapComponentLoaded'
        );
    }

    getMapComponents() {
        let that = this;
        kml.toGeoJson(path.join(__dirname, './../../' + config.kml))
            .then(function (fc) {
                that.actions.mapComponentLoaded(fc.features);
            });
    }

    getFilteredMapComponents(filter) {
        let regexp = new RegExp(".*" + filter + ".*", 'i');
        let that = this;
        kml.toGeoJson(path.join(__dirname, './../../' + config.kml))
            .then(function (fc) {
                var filtered = [];

                for (var i = 0; i < fc.features.length; i++) {
                    if (regexp.test(fc.features[i].properties.description) || regexp.test(fc.features[i].properties.name)) {
                        filtered.push(fc.features[i]);
                    }
                }
                that.actions.filteredMapComponentLoaded({filtered: filtered, filter: filter});
            });
    }
}
export default alt.createActions(GetMapComponentsActions);