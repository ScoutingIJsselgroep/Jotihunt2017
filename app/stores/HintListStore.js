import alt from '../alt';
import HintListActions from '../actions/HintListActions';

class HintListStore {
  constructor() {
    this.bindActions(HintListActions);
    this.hintlist = [];
  }

  onGetHintsSuccess(data) {
    console.log("trigger");
    console.log(data);
    this.hintlist = data;
  }

  onGetHintsFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(HintListStore);