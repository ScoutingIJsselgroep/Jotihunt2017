/**
 * Created by tristan on 26-9-16.
 */
import alt from '../alt';
import AuthStore from './../stores/AuthStore';

class FoxStatusAction {
    constructor() {
        this.generateActions(
            'getFoxStatusSuccess',
            'getFoxStatusFail'
        );
    }

    getFoxStatus(){
        let url = '/api/foxstatus';

        $.ajax({
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + AuthStore.getState().jwtkey);
            },
            url: url
        })
            .done((data) => {
                this.actions.getFoxStatusSuccess({data: data});
            })
            .fail((jqXhr) => {
                this.actions.getFoxStatusFail(jqXhr);
            });
    }

    updateFoxStatus(data) {
        this.actions.getFoxStatusSuccess({data: data.data});
    }
}

export default alt.createActions(FoxStatusAction);