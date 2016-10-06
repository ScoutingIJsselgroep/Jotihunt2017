import React from 'react';
import CarListStore from '../stores/CarListStore';
import CarListActions from '../actions/CarListActions';
import GetMapComponentsStore from '../stores/GetMapComponentsStore';
import GetMapComponentsActions from '../actions/GetMapComponentsActions';
import PointLayer from './PointLayer';
import MapStore from '../stores/MapStore';
import MapActions from '../actions/MapActions';

import JHKmlLayer from './JHKmlLayer';

import {Gmaps, Marker, InfoWindow} from 'react-gmaps';

var config = require('./../../config');

var lat = config.map.center.lat;
var lng = config.map.center.lng;
var zoom = config.map.center.zoom;

class MapCars extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mapConstructor: GetMapComponentsStore.getState(),
            carlist: CarListStore.getState(),
            mapOptions: MapStore.getState(),
        };
        this.onCarListChange = this.onCarListChange.bind(this);
        this.onMapComponentsChange = this.onMapComponentsChange.bind(this);
        this.onMapChange = this.onMapChange.bind(this);
        this.boundsChanged = this.boundsChanged.bind(this);
    }

    boundsChanged(){
        lat = this.refs.Gmaps.map.center.lat();
        lng = this.refs.Gmaps.map.center.lng();
        zoom = this.refs.Gmaps.map.zoom;
    }

    componentDidMount() {
        CarListStore.listen(this.onCarListChange);
        GetMapComponentsStore.listen(this.onMapComponentsChange);
        MapStore.listen(this.onMapChange);
        CarListActions.getCars();
        GetMapComponentsActions.getMapComponents();

        let socket = io.connect();
        socket.on('updateCars', (data) => {
            CarListActions.getCars();
        });
    }

    componentWillUnmount() {
        CarListStore.unlisten(this.onCarListChange);
        GetMapComponentsStore.unlisten(this.onMapComponentsChange);
        MapStore.unlisten(this.onMapChange);
    }

    onMapComponentsChange(state) {
        this.setState({
            mapConstructor: state
        });
    }

    onMapChange(state) {
        this.setState({
            mapOptions: state
        });
    }

    onCarListChange(state) {
        this.setState({
            carlist: state,
        });
    }

    refresh() {
        CarListActions.getCars();
    }

    addInfoWindow(point) {
        const object = [{
            type: "infowindow",
            content: point.content,
            wsgx: point.wsgx,
            wsgy: point.wsgy
        }];
        MapActions.addInfoWindow(object);
    }

    render() {
        var infoWindow = this.addInfoWindow.bind(this);
        return (
            <div className='container'>
                <div className='row fadeInUp animated'>
                    <div className='col-sm-12'>
                        <div className='panel panel-default'>
                            <div className='panel-heading'>Auto's op de kaart
                                <button className="btn btn-sm btn-default pull-right" onClick={this.refresh.bind(this)}><i
                                    className="fa fa-refresh" aria-hidden="true"></i>
                                    Refresh
                                </button>
                            </div>
                            <div className='panel-body'>
                                <input id="pac-input" className="controls fadeInUp animated" type="text"
                                       placeholder="Zoeken"/>
                                <Gmaps
                                    width={'100%'}
                                    height={'50em'}
                                    lat={lat}
                                    lng={lng}
                                    zoom={zoom}
                                    loadingMessage={'Map laden'}
                                    onBoundsChanged={this.boundsChanged}
                                    ref="Gmaps"
                                    params={{v: '3.exp', key: config.apiKey, libraries: 'places'}}>
                                    {PointLayer.render(this.state.carlist.carlist, {
                                        showLines: true,
                                        showFirst: false
                                    }, infoWindow)}
                                    {PointLayer.render(this.state.mapOptions.infoWindow, {}, infoWindow)}
                                    {JHKmlLayer.render(this.state.mapConstructor.mapConstructor, false, false, true, infoWindow)}
                                </Gmaps>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MapCars;