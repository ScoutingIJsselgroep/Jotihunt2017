import alt from '../alt';
import GetMapComponentsActions from '../actions/GetMapComponentsActions';

class GetMapComponentsStore {
    constructor() {
        this.bindActions(GetMapComponentsActions);
        this.mapConstructor = [];
    }

    onMapComponentLoaded(components){
        this.mapConstructor = components;
    }
}

export default alt.createStore(GetMapComponentsStore, 'GetMapComponentsStore');