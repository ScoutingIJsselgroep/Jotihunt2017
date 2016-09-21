import alt from '../alt';

var config = require('./../../config');
var rdToWgs = require('rdtowgs');
var googleMapsClient = require('@google/maps').createClient({
  key: config.apiKey
});

class AddCharacterActions {
  constructor() {
    this.generateActions(
      'addHintSuccess',
      'addHintFail',
      'updateRdySuccess',
      'updateRdxSuccess',
      'invalidRdx',
      'invalidRdy',
      'invalidSubarea',
      'updateLocation'
    );
  }

  updateRdy (rdx, rdy) {
    const val = rdToWgs(rdy, rdx);
    const wsgx = val[0];
    const wsgy = val[1];
    if (rdy && rdx && rdy.length == 5 && rdx.length == 5) {
      const that = this;
      googleMapsClient.reverseGeocode({
        latlng: [wsgx, wsgy]
      }, function (err, response) {
        that.actions.updateRdySuccess({rdy: rdy, response: response.json.results[0].formatted_address});
      });
    } else {
      this.actions.updateRdySuccess({rdy: rdy});
    }
  }

  updateRdx (rdx, rdy) {
    const val = rdToWgs(rdy, rdx);
    const wsgx = val[0];
    const wsgy = val[1];
    if (rdy && rdx && rdy.length == 5 && rdx.length == 5) {
      const that = this;
      googleMapsClient.reverseGeocode({
        latlng: [wsgx, wsgy]
      }, function (err, response) {
        that.actions.updateRdxSuccess({rdx: rdx, response: response.json.results[0].formatted_address});
      });
    } else {
      this.actions.updateRdxSuccess({rdx: rdx});
    }
  }

  addHint(rdx, rdy, wsgx, wsgy, location, subarea) {
    $.ajax({
      type: 'POST',
      url: '/api/hints',
      data: { rdx: rdx, rdy: rdy, wsgx: wsgx, wsgy: wsgy, location: location, subarea: subarea}
    })
      .done((data) => {
        this.actions.addHintSuccess(data.message);
      })
      .fail((jqXhr) => {
        this.actions.addHintFail(jqXhr.responseJSON.message);
      });
  }
}

module.exports = alt.createActions(AddCharacterActions);