import alt from '../alt';

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
                    let stripped = fc.features[i].properties.extended.replace("<![CDATA[", "").replace("]]>", "").replace(/<\/?[^>]+(>|$)/g, "").replace(/\s/g, "");
                    stripped = stripped.charAt(stripped.length - 1);
                    const subareas = config.subareas;
                    for(let subarea in subareas){
                        if (subareas[subarea].charAt(0) == stripped){
                            stripped = subareas[subarea];
                            break;
                        }
                    }
                    console.log(stripped);
                    if (regexp.test(fc.features[i].properties.extended) || regexp.test(fc.features[i].properties.name)|| filter == stripped ) {
                        fc.features[i].properties.subarea = stripped;
                        filtered.push(fc.features[i]);
                    }
                }
                that.actions.filteredMapComponentLoaded({filtered: filtered, filter: filter});
            });
    }
}
export default alt.createActions(GetMapComponentsActions);