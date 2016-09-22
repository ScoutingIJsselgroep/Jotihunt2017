import React from 'react';
import CarListStore from '../stores/CarListStore';
import CarListActions from '../actions/CarListActions';
import PointLayer from './PointLayer';
import MapStore from '../stores/MapStore';
import MapActions from '../actions/MapActions';



import {Gmaps, Marker, InfoWindow} from 'react-gmaps';

var config = require('./../../config');

class MapCars extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      carlist: CarListStore.getState(),
      mapOptions: MapStore.getState(),
    };
    this.onCarListChange = this.onCarListChange.bind(this);
    this.onMapChange = this.onMapChange.bind(this);
  }

  componentDidMount() {
    CarListStore.listen(this.onCarListChange);
    MapStore.listen(this.onMapChange);
    CarListActions.getCars();
  }

  componentWillUnmount() {
    CarListStore.unlisten(this.onCarListChange);
    MapStore.unlisten(this.onMapChange);
  }

  onMapChange (state) {
    this.setState({
      mapOptions: state
    });
  }

  onCarListChange (state) {
    this.setState({
      carlist: state,
    });
  }

  refresh() {
    CarListActions.getCars();
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
              <div className='panel-heading'>Auto's op de kaart
                &nbsp; <small onClick={this.refresh}><i className="fa fa-refresh" aria-hidden="true"></i>
                  Refresh</small></div>
              <div className='panel-body'>
                <Gmaps
                    width={'100%'}
                    height={'50em'}
                    lat={config.map.center.lat}
                    lng={config.map.center.lng}
                    zoom={config.map.center.zoom}
                    loadingMessage={'Map laden'}
                    params={{v: '3.exp', key: config.apiKey}}>
                  {PointLayer.render(this.state.carlist.carlist, {
                    showLines: true,
                    showFirst: false
                  }, infoWindow)}
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

export default MapCars;