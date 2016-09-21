import alt from '../alt';

class HintListActions {
  constructor() {
    this.generateActions(
      'getHintsSuccess',
      'getHintsFail'
    );
  }

  getHints() {
    let params = {

    };
    let url = '/api/hints';

    $.ajax({ url: url, data: params })
      .done((data) => {
        console.log(data);
        this.actions.getHintsSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getHintsFail(jqXhr);
      });
  }
}

export default alt.createActions(HintListActions);