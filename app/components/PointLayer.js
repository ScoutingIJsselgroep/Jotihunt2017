import React from 'react';
import {Circle, Marker, Polyline} from 'react-gmaps';

var config = require('./../../config');

module.exports = {
    render(pointList) {
        var result = [];
        var polylines = {};
        for (var count in pointList){
            var it = pointList[count];
            switch (it.type){
                case "hint":
                    if(!polylines[it.subarea]){
                        polylines[it.subarea] = [];
                    }
                    polylines[it.subarea].push({
                        lat: it.wsgx,
                        lng: it.wsgy
                    });
                    result.push(<Marker
                        lat={it.wsgx}
                        lng={it.wsgy}
                        draggable={false}
                        key={result.length}
                    />);
                default:
                    break;
            }
        }
        for (var key in polylines){
            result.push(<Polyline
                path={polylines[key]}
                key={result.length}
            />);
        }
        return result;
    }
};
