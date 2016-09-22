import alt from '../alt';

class HintListActions {
  constructor() {
    this.generateActions(
      'getHintsSuccess',
      'getHintsFail'
    );
  }

  getHints(value) {
    let params = {
      value: value
    };
    let url = '/api/hints';

    $.ajax({ url: url, data: params })
      .done((data) => {
        this.actions.getHintsSuccess({data: data, search: value});
      })
      .fail((jqXhr) => {
        this.actions.getHintsFail(jqXhr);
      });
  }
}

export default alt.createActions(HintListActions);