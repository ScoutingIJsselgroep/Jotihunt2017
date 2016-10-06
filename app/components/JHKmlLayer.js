import React from 'react';
import {Circle, Marker, Polygon} from 'react-gmaps';

var config = require('./../../config');

module.exports = {
    insideArea(mapComponents, lng, lat) {
        let mc;
        for (mc in mapComponents) {
            if (mapComponents[mc].geometry.type == "Polygon") {
                let pc;
                let vertices_lat = [];
                let vertices_lng = [];
                for (pc in mapComponents[mc].geometry.coordinates[0]) {
                    vertices_lat.push(mapComponents[mc].geometry.coordinates[0][pc][1]);
                    vertices_lng.push(mapComponents[mc].geometry.coordinates[0][pc][0]);
                }

                // Check if in polygon
                let length = vertices_lat.length;
                let i = 0;
                let j = 0;
                let c = 0;

                for (i = 0, j = length - 1; i < length; j = i++) {
                    if ((vertices_lng[i] > lat != (vertices_lng[j] > lat)) && (lng < (vertices_lat[j] - vertices_lat[i]) * (lat - vertices_lng[i]) / (vertices_lng[j] - vertices_lng[i]) + vertices_lat[i])) {
                        c = !c;
                    }
                }
                if (c) {
                    return mapComponents[mc].properties.name;
                }
            }
        }
    },

    render(mapComponents, group=true, circle=true, subarea=true, forceUpdate, mapClick) {
        var result = [];
        for (var count in mapComponents) {
            var it = mapComponents[count];
            switch (it.geometry.type) {
                case "Point":
                    if (group) {
                        let groupInfoWindow = {
                            content: '<b>' + it.properties.name + '</b><br/>' + it.properties.description +
                            '<a class="button" href="google.navigation:q=' + it.geometry.coordinates[1] + ',' +
                            it.geometry.coordinates[0] + '"><i class="fa fa-location-arrow" aria-hidden="true"></i> Navigeer</a>',
                            wsgx: it.geometry.coordinates[1],
                            wsgy: it.geometry.coordinates[0]
                        };
                        result.push(<Marker
                            icon="/img/scouting.gif"
                            lat={it.geometry.coordinates[1]}
                            lng={it.geometry.coordinates[0]}
                            draggable={false}
                            onClick={forceUpdate.bind(this, groupInfoWindow)}
                            key={result.length}
                        />);
                        if (circle && it.properties.name.indexOf(config.circle.forGroup) !== -1) {
                            result.push(<Circle
                                lat={it.geometry.coordinates[1]}
                                lng={it.geometry.coordinates[0]}
                                key={result.length}
                                radius={config.circle.radius}
                            />);
                        }
                    }
                    break;
                case "Polygon":
                    if (subarea) {
                        const refactor = [];
                        let i;
                        for (i in it.geometry.coordinates[0]) {
                            refactor.push({
                                lat: it.geometry.coordinates[0][i][1],
                                lng: it.geometry.coordinates[0][i][0]
                            });
                        }
                        if (mapClick) {
                            result.push(<Polygon
                                path={refactor}
                                fillColor={'#' + it.properties.style}
                                strokeColor={'#' + it.properties.style}
                                fillOpacity={config.map.fillOpacity}
                                key={result.length}
                                onClick={mapClick.bind(this, it.properties.name)}
                            />);
                        } else {
                            result.push(<Polygon
                                path={refactor}
                                fillColor={'#' + it.properties.style}
                                strokeColor={'#' + it.properties.style}
                                fillOpacity={config.map.fillOpacity}
                                key={result.length}
                            />);
                        }
                    }
                    break;
                default:
                    break;
            }
        }
        return result;
    }
};
