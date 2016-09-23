import alt from '../alt';
import AddHintActions from '../actions/AddHintActions';
var config = require('./../../config');

var rdToWgs = require('rdtowgs');

class AddHintStore {
  constructor() {
    this.bindActions(AddHintActions);
    this.rdx = '';
    this.rdy = '';
    this.wsgx = 52.1997968;
    this.wsgy = 6.2130802;
    this.location = 'Vul eerst coördinaten in.';
    this.rdxHelpBlock = '';
    this.rdyHelpBlock = '';
    this.rdxValidationState = '';
    this.rdyValidationState = '';
    this.subareaValidationState = '';
    this.subareaHelpBlock = '';
  }

  onAddHintSuccess(successMessage) {
    this.rdx = '';
    this.rdy = '';
    this.rdxValidationState = 'has-success';
    this.rdxHelpBlock = successMessage;
  }

  onAddHintFail(errorMessage) {
    this.rdxValidationState = 'has-error';
    this.rdxHelpBlock = errorMessage;
  }

  onUpdateRdxSuccess(data) {
    this.rdx = data.rdx;
    this.rdxValidationState = '';
    this.rdxHelpBlock = '';
    this.subareaValidationState = '';
    this.subareaHelpBlock = '';

    const val = rdToWgs(this.rdy, this.rdx);
    this.wsgx = val[0];
    this.wsgy = val[1];
    if(data.response) {
      this.location = data.response;
    } else {
      this.location = 'Vul eerst coördinaten in.';
    }
    this.emitChange();
  }

  onUpdateRdySuccess(data) {
    this.rdy = data.rdy;
    this.rdyValidationState = '';
    this.rdyHelpBlock = '';
    this.subareaValidationState = '';
    this.subareaHelpBlock = '';

    const val = rdToWgs(this.rdy, this.rdx);
    this.wsgx = val[0];
    this.wsgy = val[1];
    if(data.response) {
      this.location = data.response;
    } else {
      this.location = 'Vul eerst coördinaten in.';
    }
    this.emitChange();
  }

  onSwitchAutocomplete() {
    this.autocomplete = !this.autocomplete;
  }

  onInvalidSubarea() {
    this.subareaValidationState = 'has-error';
    this.subareaHelpBlock = 'Deelgebied klopt niet.';
  }

  onInvalidRdx() {
    this.rdxValidationState = 'has-error';
    this.rdxHelpBlock = 'Voer alsjeblieft een coordinaat in.';
  }

  onInvalidRdy() {
    this.rdyValidationState = 'has-error';
    this.rdyHelpBlock = 'Voer alsjeblieft een coordinaat in.';
  }
}

export default alt.createStore(AddHintStore, 'AddHintStore');