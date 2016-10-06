import React from 'react';
import HintListStore from '../stores/HintListStore';
import MapStore from '../stores/MapStore';
import HintListActions from '../actions/HintListActions';
import MapActions from '../actions/MapActions';
import PointLayer from './PointLayer';
import FoxStatus from './FoxStatus';
import GetMapComponentsActions from '../actions/GetMapComponentsActions';
import AddHintsActions from '../actions/AddHintActions';
import GetMapComponentsStore from '../stores/GetMapComponentsStore';
import JHKmlLayer from './JHKmlLayer';
import CarListStore from '../stores/CarListStore';
import CarListActions from '../actions/CarListActions';

import {Gmaps, Marker, InfoWindow} from 'react-gmaps';

var config = require('./../../config');

var lat = config.map.center.lat;
var lng = config.map.center.lng;
var zoom = config.map.center.zoom;

class MapHint extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hintlist: HintListStore.getState(),
            mapOptions: MapStore.getState(),
            carlist: CarListStore.getState(),
            mapConstructor: GetMapComponentsStore.getState(),
        };
        this.forceUpdate = this.forceUpdate.bind(this);
        this.onHintListChange = this.onHintListChange.bind(this);
        this.onCarListChange = this.onCarListChange.bind(this);
        this.onMapChange = this.onMapChange.bind(this);
        this.onMapComponentsChange = this.onMapComponentsChange.bind(this);
        this.boundsChanged = this.boundsChanged.bind(this);
    }

    componentDidMount() {
        CarListStore.listen(this.onCarListChange);
        CarListActions.getCars();
        HintListActions.getHints();
        GetMapComponentsActions.getMapComponents();
        HintListStore.listen(this.onHintListChange);
        MapStore.listen(this.onMapChange);
        GetMapComponentsStore.listen(this.onMapComponentsChange);
        let socket = io.connect();
        socket.on('updateHint', (data) => {
            HintListActions.getHints();
        });
        socket.on('updateCars', (data) => {
            CarListActions.getCars();
        });
    }

    componentWillUnmount() {
        CarListStore.unlisten(this.onCarListChange);
        HintListStore.unlisten(this.onHintListChange);
        MapStore.unlisten(this.onMapChange);
        GetMapComponentsStore.unlisten(this.onMapComponentsChange);
    }

    onMapChange(state) {
        this.setState({
            mapOptions: state
        });
    }

    onMapComponentsChange(state) {
        this.setState({
            mapConstructor: state
        });
    }

    onHintListChange(state) {
        this.setState({
            hintlist: state,
        });
    }

    addInfoWindow(point) {
        const object = [{
            type: "infowindow",
            content: point.content,
            wsgx: point.wsgx,
            wsgy: point.wsgy
        }];

        HintListActions.getHints();
        MapActions.addInfoWindow(object);
    }

    onCarListChange(state) {
        this.setState({
            carlist: state,
        });
    }

    refresh() {
        HintListActions.getHints();
        CarListActions.getCars();
    }

    clickMap(subarea, event) {
        MapActions.addSpecialMarker({lat: event.latLng.lat(), lng: event.latLng.lng(), subarea: subarea});
    }

    specialMarkerClose() {
        MapActions.closeSpecialMarker();
    }

    specialMarkerSubmit() {
        event.preventDefault();
        var rdx = 0;
        var rdy = 0;
        var wsgx = this.state.mapOptions.specialmarker.lat;
        var wsgy = this.state.mapOptions.specialmarker.lng;
        var location = this.state.mapOptions.specialmarker.location;
        var subarea = this.state.mapOptions.specialmarker.subarea;
        var type = this.refs.messageTypeSelect.value;
        AddHintsActions.addHint(rdx, rdy, wsgx, wsgy, location, subarea, type);
        MapActions.closeSpecialMarker();
    }

    boundsChanged(){
        lat = this.refs.Gmaps.map.center.lat();
        lng = this.refs.Gmaps.map.center.lng();
        zoom = this.refs.Gmaps.map.zoom;
    }

    render() {
        var specialMarker = "";
        var specialMarkerWindow = "";

        if (this.state.mapOptions.specialmarker.lat != undefined) {
            specialMarkerWindow = (
                <div className='row fadeInUp fadeOutDown animated'>
                    <div className='col-sm-12'>
                        <div className='panel panel-default'>
                            <div className='panel-heading'>
                                Markering toevoegen
                            </div>
                            <div className='panel-body'>
                                <div className={'form-group'}>
                                    <label className='control-label'>Locatie</label>
                                    <input type='text' className='form-control' ref='locationTextField'
                                           value={this.state.mapOptions.specialmarker.location} disabled="true"/>
                                </div>
                                <div className={'form-group'}>
                                    <label className='control-label'>Deelgebied</label>
                                    <input type='text' className='form-control' ref='subareaTextField'
                                           value={this.state.mapOptions.specialmarker.subarea} disabled="true"/>
                                </div>
                                <div className={'form-group'}>
                                    <label className='control-label'>Verstuur als een...</label>
                                    <select className='form-control' ref="messageTypeSelect">
                                        <option value="hint">Hint</option>
                                        <option value="hunt">Hunt</option>
                                        <option value="other">Gewoon een locatie via Telegram sturen</option>
                                    </select>
                                </div>
                                <a className='btn btn-primary' onClick={this.specialMarkerSubmit.bind(this)}>Verstuur</a>
                                <a className='btn btn-default' onClick={this.specialMarkerClose}>Sluiten</a>
                            </div>
                        </div>
                    </div>
                </div>
            );
            specialMarker = (<Marker
                lat={this.state.mapOptions.specialmarker.lat}
                lng={this.state.mapOptions.specialmarker.lng}
                draggable={false}
                icon={config.map.icon.green}
            />);
        }
        var infoWindow = this.addInfoWindow.bind(this);
        var mapClick = this.clickMap.bind(this);
        return (
            <div className='container'>
                <FoxStatus />
                {specialMarkerWindow}
                <div className='row fadeInUp animated'>
                    <div className='col-sm-12'>
                        <div className='panel panel-default'>
                            <div className='panel-heading'>Hints op de kaart
                                &nbsp;
                                <button className="btn btn-sm btn-default pull-right" onClick={this.refresh.bind(this)}>
                                    <i
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
                                    fullscreenControl={false}
                                    onBoundsChanged={this.boundsChanged}
                                    loadingMessage={'Map laden'}
                                    ref="Gmaps"
                                    params={{v: '3.exp', key: config.apiKey, libraries: 'places'}}>
                                    {PointLayer.render(this.state.hintlist.hintlist, {showLines: true}, infoWindow)}
                                    {JHKmlLayer.render(this.state.mapConstructor.mapConstructor, true, true, true, infoWindow, mapClick)}
                                    {PointLayer.render(this.state.mapOptions.infoWindow, {}, infoWindow)}
                                    {PointLayer.render(this.state.carlist.carlist, {
                                        showLines: true,
                                        showFirst: false
                                    }, infoWindow)}
                                    {specialMarker}
                                </Gmaps>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MapHint;