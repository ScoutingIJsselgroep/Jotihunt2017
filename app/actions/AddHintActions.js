import alt from '../alt';

var SendMessages = require('./../helpers/sendMessages');

import AuthStore from './../stores/AuthStore';
var moment = require('moment');

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

  addHint(rdx, rdy, wsgx, wsgy, location, subarea, type) {
      if (type == "hint") {
        SendMessages.sendMessage({
          chat_id: config.telegramchats[subarea],
          text: '[HINT] Nieuwe locatie voor ' + subarea + ': ' + location
        });
      } else if (type == "hunt") {
        SendMessages.sendMessage({
          chat_id: config.telegramchats[subarea],
          text: '[HUNT] Vossen in dit deelgebied mogen pas rond ' + moment().add(1, 'hours').format("ddd HH:mm") + ' weer gehunt worden!'
        });
      } else {
        SendMessages.sendMessage({
          chat_id: config.telegramchats[subarea],
          text: '[LOCATIE] Gewoon een locatie doorgestuurd vanaf Jotihunt.JS'
        });
      }
      SendMessages.sendLocation({
        chat_id: config.telegramchats[subarea],
        latitude: wsgx,
        longitude: wsgy
      });
      $.ajax({
        type: 'POST',
        url: '/api/hints',
        beforeSend: function (xhr) {
          xhr.setRequestHeader ("Authorization", "Bearer " + AuthStore.getState().jwtkey);
        },
        data: {rdx: rdx, rdy: rdy, wsgx: wsgx, wsgy: wsgy, location: location, subarea: subarea, type: type}
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