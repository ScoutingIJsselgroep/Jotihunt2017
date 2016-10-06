import React from 'react';
import HintListStore from '../stores/HintListStore';
import MapStore from '../stores/MapStore';
import HintListActions from '../actions/HintListActions';
import MapActions from '../actions/MapActions';
import PointLayer from './PointLayer';
import FoxStatus from './FoxStatus';
import GetMapComponentsActions from '../actions/GetMapComponentsActions';
import GetMapComponentsStore from '../stores/GetMapComponentsStore';
import JHKmlLayer from './JHKmlLayer';



import {Gmaps, Marker, InfoWindow} from 'react-gmaps';

var config = require('./../../config');

var lat = config.map.center.lat;
var lng = config.map.center.lng;
var zoom = config.map.center.zoom;

class MapHint extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      hintlist: HintListStore.getState(),
      mapOptions: MapStore.getState(),
      mapConstructor: GetMapComponentsStore.getState(),
    };
    this.forceUpdate = this.forceUpdate.bind(this);
    this.onHintListChange = this.onHintListChange.bind(this);
    this.onMapChange = this.onMapChange.bind(this);
    this.onMapComponentsChange = this.onMapComponentsChange.bind(this);
    this.boundsChanged = this.boundsChanged.bind(this);
  }

  boundsChanged(){
    lat = this.refs.Gmaps.map.center.lat();
    lng = this.refs.Gmaps.map.center.lng();
    zoom = this.refs.Gmaps.map.zoom;
  }

  componentDidMount() {
    HintListActions.getHints();
    GetMapComponentsActions.getMapComponents();
    HintListStore.listen(this.onHintListChange);
    MapStore.listen(this.onMapChange);
    GetMapComponentsStore.listen(this.onMapComponentsChange);
    let socket = io.connect();
    socket.on('updateHint', (data) => {
      HintListActions.getHints();
    });
  }

  componentWillUnmount() {
    HintListStore.unlisten(this.onHintListChange);
    MapStore.unlisten(this.onMapChange);
    GetMapComponentsStore.unlisten(this.onMapComponentsChange);
  }

  onMapChange (state) {
    this.setState({
      mapOptions: state
    });
  }

  onMapComponentsChange (state) {
    this.setState({
      mapConstructor: state
    });
  }

  onHintListChange (state) {
    this.setState({
      hintlist: state,
    });
  }

  addInfoWindow (point) {
    const object = [{
      type: "infowindow",
      content: point.content,
      wsgx: point.wsgx,
      wsgy: point.wsgy
    }];

    HintListActions.getHints();
    MapActions.addInfoWindow(object);
  }

  refresh() {
    HintListActions.getHints();
  }

  render () {
    var infoWindow = this.addInfoWindow.bind(this);
    return (
      <div className='container'>
        <FoxStatus />
        <div className='row fadeInUp animated'>
          <div className='col-sm-12'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Hints op de kaart
                &nbsp; <button className="btn btn-sm btn-default pull-right" onClick={this.refresh.bind(this)}><i
                    className="fa fa-refresh" aria-hidden="true"></i>
                  Refresh
                </button></div>
              <div className='panel-body'>
                <input id="pac-input" className="controls fadeInUp animated" type="text" placeholder="Zoeken" />
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
                  {JHKmlLayer.render(this.state.mapConstructor.mapConstructor, false, false, true, infoWindow)}
                  {PointLayer.render(this.state.mapOptions.infoWindow, {}, infoWindow)}
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