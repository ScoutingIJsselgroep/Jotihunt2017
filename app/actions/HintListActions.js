import alt from '../alt';
import AuthStore from './../stores/AuthStore';


class HintListActions {
    constructor() {
        this.generateActions(
            'getHintsSuccess',
            'getHintsFail',
            'hintDeleted',
            'hintDeleteFailed'
        );
    }

    deleteHint(id) {
        let url = '/api/hints?' + $.param({"id": id});
        $.ajax({
            url: url,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + AuthStore.getState().jwtkey);
            },
            type: 'DELETE'
        }).done((data) => {
            this.actions.hintDeleted();

        }).fail((jqXhr) => {
            this.actions.hintDeleteFailed();
        });
    }

    getHints(value) {
        let params = {
            value: value
        };
        let url = '/api/hints';

        $.ajax({
            url: url,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + AuthStore.getState().jwtkey);
            },
            data: params
        })
            .done((data) => {
                this.actions.getHintsSuccess({data: data, search: value});
            })
            .fail((jqXhr) => {
                this.actions.getHintsFail(jqXhr);
            });
    }
}

export default alt.createActions(HintListActions);