import React from 'react';
import HintListStore from '../stores/HintListStore';
import HintListActions from '../actions/HintListActions';
import PointLayer from './PointLayer';


import {Gmaps, Marker, InfoWindow} from 'react-gmaps';

var config = require('./../../config');

class MapHint extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      hintlist: HintListStore.getState(),
    };
    this.onHintListChange = this.onHintListChange.bind(this);
  }

  componentDidMount() {
    HintListStore.listen(this.onHintListChange);
    HintListActions.getHints();
  }

  componentWillUnmount() {
    HintListStore.unlisten(this.onHintListChange);
  }

  onHintListChange (state) {
    this.setState({
      hintlist: state,
    });
  }

  refresh() {
    HintListActions.getHints();
  }

  render () {
    console.log(this.state.hintlist);
    return (
      <div className='container'>
        <div className='row fadeInUp animated'>
          <div className='col-sm-12'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Hints op de kaart
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
                  {PointLayer.render(this.state.hintlist.hintlist)}
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