import React from 'react';
import GetMapComponentsStore from '../stores/GetMapComponentsStore';
import GetMapComponentsActions from '../actions/GetMapComponentsActions';
import PointLayer from './PointLayer';
import MapStore from '../stores/MapStore';
import MapActions from '../actions/MapActions';

import JHKmlLayer from './JHKmlLayer';

import {Gmaps, Marker, InfoWindow} from 'react-gmaps';

var config = require('./../../config');

class AddHint extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      mapConstructor: GetMapComponentsStore.getState(),
      mapOptions: MapStore.getState(),
    };
    this.onMapComponentsChange = this.onMapComponentsChange.bind(this);
    this.onMapChange = this.onMapChange.bind(this);
  }

  componentDidMount() {
    GetMapComponentsStore.listen(this.onMapComponentsChange);
    MapStore.listen(this.onMapChange);
    GetMapComponentsActions.getMapComponents();
  }

  componentWillUnmount() {
    GetMapComponentsStore.unlisten(this.onMapComponentsChange);
    MapStore.unlisten(this.onMapChange);
  }

  onMapComponentsChange (state) {
    this.setState({
      mapConstructor: state
    });
  }

  onMapChange (state) {
    this.setState({
      mapOptions: state
    });
  }

  addInfoWindow (point) {
    const object = [{
      type: "infowindow",
      content: point.content,
      wsgx: point.wsgx,
      wsgy: point.wsgy
    }];
    MapActions.addInfoWindow(object);
  }

  render () {
    var infoWindow = this.addInfoWindow.bind(this);
    return (
      <div className='container'>
        <div className='row fadeInUp animated'>
          <div className='col-sm-12'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Scoutinggroepen</div>
              <div className='panel-body'>
                  <Gmaps
                      width={'100%'}
                      height={'50em'}
                      lat={config.map.center.lat}
                      lng={config.map.center.lng}
                      zoom={config.map.center.zoom}
                      loadingMessage={'Map laden'}
                      params={{v: '3.exp', key: config.apiKey}}>

                      {JHKmlLayer.render(this.state.mapConstructor.mapConstructor, true, true, true, infoWindow)}
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

export default AddHint;