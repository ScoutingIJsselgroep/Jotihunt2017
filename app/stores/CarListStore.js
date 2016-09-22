import alt from '../alt';
import CarListActions from '../actions/CarListActions';

class CarListStore {
  constructor() {
    this.bindActions(CarListActions);
    this.carlist = [];
    this.search = '';
  }

  onGetCarsSuccess(data) {
    this.carlist = data.data;
  }

  onGetCarsFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(CarListStore);