import alt from '../alt';

class CarListActions {
  constructor() {
    this.generateActions(
      'getCarsSuccess',
      'getCarsFail'
    );
  }

  getCars() {
    let url = '/api/cars';

    $.ajax({ url: url })
      .done((data) => {
        this.actions.getCarsSuccess({data: data});
      })
      .fail((jqXhr) => {
        this.actions.getCarsFail(jqXhr);
      });
  }
}

export default alt.createActions(CarListActions);