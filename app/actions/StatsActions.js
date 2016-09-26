import alt from '../alt';
import AuthStore from './../stores/AuthStore';

class StatsActions {
    constructor() {
        this.generateActions(
            'getStatsSuccess',
            'getStatsFail'
        );
    }

    getStats() {
        $.ajax({
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + AuthStore.getState().jwtkey);
            }, url: '/api/stats'
        })
            .done((data) => {
                this.actions.getStatsSuccess(data);
            })
            .fail((jqXhr) => {
                this.actions.getStatsFail(jqXhr);
            });
    }
}

export default alt.createActions(StatsActions);