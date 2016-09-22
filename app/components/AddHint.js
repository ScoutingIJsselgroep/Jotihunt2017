import React from 'react';
import AddHintStore from '../stores/AddHintStore';
import GetMapComponentsStore from '../stores/GetMapComponentsStore';
import AddHintsActions from '../actions/AddHintActions';
import GetMapComponentsActions from '../actions/GetMapComponentsActions';

import JHKmlLayer from './JHKmlLayer';

import {Gmaps, Marker, InfoWindow} from 'react-gmaps';

var config = require('./../../config');

class AddHint extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      hints: AddHintStore.getState(),
      mapConstructor: GetMapComponentsStore.getState(),
    };
    this.onHintsChange = this.onHintsChange.bind(this);
    this.onMapComponentsChange = this.onMapComponentsChange.bind(this);
  }

  componentDidMount() {
    AddHintStore.listen(this.onHintsChange);
    GetMapComponentsStore.listen(this.onMapComponentsChange);
    GetMapComponentsActions.getMapComponents();
  }

  componentWillUnmount() {
    AddHintStore.unlisten(this.onHintsChange);
    GetMapComponentsStore.unlisten(this.onMapComponentsChange);
  }

  onHintsChange (state) {
    this.setState({
      hints: state,
    });
  }

  onMapComponentsChange (state) {
    this.setState({
      mapConstructor: state
    });
  }


  handleSubmit(event) {
    event.preventDefault();
    var rdx = this.state.hints.rdx;
    var rdy = this.state.hints.rdy;
    var wsgx = this.state.hints.wsgx;
    var wsgy = this.state.hints.wsgy;
    var location = this.state.hints.location;
    var subarea = this.refs.subareaTextField.value;


    if (!rdx) {
      AddHintsActions.invalidRdx();
    }

    if (!rdy) {
      AddHintsActions.invalidRdy();
    }

    if (!subarea) {
      AddHintsActions.invalidSubarea();
    }

    if (rdx && rdy && subarea) {
      AddHintsActions.addHint(rdx, rdy, wsgx, wsgy, location, subarea);
    }
  }

  updateRdx (event) {
    AddHintsActions.updateRdx(event.target.value, this.state.hints.rdy);
  }

  updateRdy (event) {
    AddHintsActions.updateRdy(this.state.hints.rdx, event.target.value);
  }

  addInfoWindow(){

  }

  render () {
    var infoWindow = this.addInfoWindow.bind(this);
    return (
      <div className='container'>
        <div className='row fadeInUp animated'>
          <div className='col-sm-8'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Hint Toevoegen</div>
              <div className='panel-body'>
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <div className={'form-group ' + this.state.hints.rdxValidationState}>
                    <label className='control-label'>X-coordinaat <small>5 tekens</small></label>
                    <input type='text' className='form-control' ref='rdxTextField' value={this.state.hints.rdx}
                           onChange={this.updateRdx.bind(this)} placeholder="46828" autoFocus/>
                    <span className='help-block'>{this.state.hints.rdxHelpBlock}</span>
                  </div>
                  <div className={'form-group ' + this.state.hints.rdyValidationState}>
                    <label className='control-label'>Y-coordinaat <small>5 tekens</small></label>
                    <input type='text' className='form-control' ref='rdyTextField' value={this.state.hints.rdy}
                           onChange={this.updateRdy.bind(this)} placeholder="21146"/>
                    <span className='help-block'>{this.state.hints.rdyHelpBlock}</span>
                  </div>
                  <div className={'form-group'}>
                    <label className='control-label'>Locatie</label>
                    <input type='text' className='form-control' ref='locationTextField' value={this.state.hints.location}
                            disabled="true" />
                  </div>
                  <div className={'form-group ' + this.state.hints.subareaValidationState}>
                    <label className='control-label'>Deelgebied</label>
                    <input type='text' className='form-control' ref='subareaTextField' value={JHKmlLayer.insideArea(this.state.mapConstructor.mapConstructor,
                        this.state.hints.wsgx,
                        this.state.hints.wsgy)}
                           disabled="true" />
                    <span className='help-block'>{this.state.hints.subareaHelpBlock}</span>
                  </div>
                  <Gmaps
                      width={'100%'}
                      height={'20em'}
                      lat={this.state.hints.wsgx}
                      lng={this.state.hints.wsgy}
                      zoom={10}
                      loadingMessage={'Be happy'}
                      params={{v: '3.exp', key: config.apiKey}}>

                      {JHKmlLayer.render(this.state.mapConstructor.mapConstructor, true, false, true, infoWindow)}

                      <InfoWindow
                        lat={this.state.hints.wsgx}
                        lng={this.state.hints.wsgy}
                        content={'Geselecteerde locatie: </br><b>'+this.state.hints.location+'</b>'}
                        />
                  </Gmaps>
                  <button type='submit' className='btn btn-primary'>Verstuur</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddHint;