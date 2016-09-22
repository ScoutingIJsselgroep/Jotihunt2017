import React from 'react';
import {Circle, Marker, Polyline, InfoWindow} from 'react-gmaps';

var config = require('./../../config');
var moment = require('moment');


module.exports = {
    render(pointList, options, forceUpdate) {
        var polylines = {};
        console.log(pointList);
        var result = pointList.reverse().map(function(point){
            switch (point.type){
                case "hint":
                    if(!polylines[point.subarea]){
                        polylines[point.subarea] = [];
                    }
                    polylines[point.subarea].push({
                        lat: point.wsgx,
                        lng: point.wsgy
                    });
                    const text = '<b>'+point.subarea+' om '+moment(point.created_at).format("ddd HH:mm")+'</b><br/>'+
                                 point.location +
                                '<br/><a class="button" href="google.navigation:q='+point.wsgx+','+point.wsgy+'"><i class="fa fa-location-arrow" aria-hidden="true"></i> Navigeer</a>';
                    const object = {
                        content: text,
                        wsgx: point.wsgx,
                        wsgy: point.wsgy
                    };
                    return (<Marker
                        lat={point.wsgx}
                        lng={point.wsgy}
                        onClick={forceUpdate.bind(this, object)}
                        draggable={false}
                        key={point._id}
                        label={point.subarea.charAt(0)}
                    />);
                    break;
                case "infowindow":
                    return (<InfoWindow
                        lat={point.wsgx}
                        lng={point.wsgy}
                        key={point._id}
                        content={point.content}
                    />);
                    break;
                case "car":
                    if(!polylines[point.userId]){
                        polylines[point.userId] = [];
                    }
                    polylines[point.userId].push({
                        lat: point.wsgx,
                        lng: point.wsgy
                    });

                    let car = {
                        content: point.userName + ' om ' + moment(point.saved).format("ddd HH:mm"),
                        wsgx: point.wsgx,
                        wsgy: point.wsgy
                    };
                    if(options.showFirst || polylines[point.userId].length == 1) {
                        return (<Marker
                            lat={point.wsgx}
                            lng={point.wsgy}
                            draggable={false}
                            key={point._id}
                            onClick={forceUpdate.bind(this, car)}
                            icon="/img/car.png"
                        />);
                    }
                    break;

            }
        }.bind(this));
        pointList.reverse();
        if (options.showLines) {
            for (let key in polylines){
                if(polylines.hasOwnProperty(key)){
                   result.push(<Polyline
                        path={polylines[key]}
                   />);
                };
            }
        }
        return result;
    }
};
