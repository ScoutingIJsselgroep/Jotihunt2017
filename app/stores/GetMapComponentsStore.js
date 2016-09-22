import alt from '../alt';
import GetMapComponentsActions from '../actions/GetMapComponentsActions';

class GetMapComponentsStore {
    constructor() {
        this.bindActions(GetMapComponentsActions);
        this.mapConstructor = [];
        this.filter = '';
        this.filtered = [];
    }

    onMapComponentLoaded(components){
        this.mapConstructor = components;
    }

    onFilteredMapComponentLoaded(filterdata){
        this.filtered = filterdata.filtered;
        this.filter = filterdata.filter;
    }
}

export default alt.createStore(GetMapComponentsStore, 'GetMapComponentsStore');