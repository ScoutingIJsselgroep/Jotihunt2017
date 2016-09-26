import alt from '../alt';
import FoxStatusAction from './../actions/FoxStatusAction';


var config = require('./../../config');
class FoxStatusStore {
    constructor(){
        this.bindActions(FoxStatusAction);
        this.subareas = [];
        for (var subarea in config.subareas){
            this.subareas.push({team: config.subareas[subarea], status: "rood"});
        }
    }

    onGetFoxStatusSuccess(data){
        this.subareas = data.data;
    }

    onGetFoxStatusFail(message){
        toastr.error("Kon de vossenstatus niet ophalen");
    }
}

export default alt.createStore(FoxStatusStore, 'FoxStatusStore');