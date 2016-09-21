import alt from '../alt';

var kml = require('gtran-kml-data');
kml.setPromiseLib(require('bluebird'));

var path = require('path');
var config = require('./../../config');

class GetMapComponentsActions {
    constructor() {
        this.generateActions(
            'mapComponentLoaded'
        );
    }

    getMapComponents() {
        let that = this;
        kml.toGeoJson(path.join(__dirname, './../../' + config.kml))
            .then(function (fc) {
                that.actions.mapComponentLoaded(fc.features);
            });
    }
}
export default alt.createActions(GetMapComponentsActions);