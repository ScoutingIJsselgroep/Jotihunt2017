import alt from '../alt';

var config = require('./../../config');

class AuthActions {
    constructor() {
        this.generateActions(
            'login',
            'logout'
        );
    }
}

export default alt.createActions(AuthActions);