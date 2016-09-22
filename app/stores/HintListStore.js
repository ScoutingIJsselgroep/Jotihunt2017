import alt from '../alt';
import HintListActions from '../actions/HintListActions';

class HintListStore {
  constructor() {
    this.bindActions(HintListActions);
    this.hintlist = [];
    this.search = '';
  }

  onGetHintsSuccess(data) {
    this.search = data.search;
    this.hintlist = data.data;
  }

  onGetHintsFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(HintListStore);