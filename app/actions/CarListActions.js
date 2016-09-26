import alt from '../alt';
import AuthStore from './../stores/AuthStore';


class CarListActions {
    constructor() {
        this.generateActions(
            'getCarsSuccess',
            'getCarsFail'
        );
    }

    updateCars(data) {
        console.log(data);
        this.actions.getCarsSuccess(data);
    }

    getCars() {
        let url = '/api/cars';

        $.ajax({
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + AuthStore.getState().jwtkey);
            },
            url: url
        })
            .done((data) => {
                this.actions.getCarsSuccess({data: data});
            })
            .fail((jqXhr) => {
                this.actions.getCarsFail(jqXhr);
            });
    }
}

export default alt.createActions(CarListActions);