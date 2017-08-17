import alt from '../alt';
import AuthActions from './../actions/AuthActions';

var config = require('./../../config');

class AuthStore {
    constructor() {
        this.bindActions(AuthActions);
        this.jwtkey = typeof localStorage !== 'undefined' ? localStorage.getItem('id_token') : "";
        this.authenticated = typeof localStorage !== 'undefined' ? (localStorage.getItem('id_token') ? true : false ) : false;
    }

    onLogin(data) {

        localStorage.setItem('profile', JSON.stringify(data.profile));
        localStorage.setItem('id_token', data.token);
        toastr.success("Je bent met succes ingelogd.");

        this.jwtkey = data.token;
        this.authenticated = true;
        window.location.reload();
        this.emitChange();
    }

    onLogout() {
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');
        toastr.success("Je bent met succes uitgelogd.");
        this.authenticated = false;
        this.jwtkey = '';
        this.emitChange();
    }
}

export default alt.createStore(AuthStore, 'AuthStore');