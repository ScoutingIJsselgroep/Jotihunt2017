import React from 'react';

import {Link} from 'react-router';
import AuthActions from './../actions/AuthActions';
import AuthStore from './../stores/AuthStore';


var config = require('./../../config');

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            authenticated: AuthStore.getState(),
        };
        this.onAuthChange = this.onAuthChange.bind(this);

    }
    componentDidMount() {
        AuthStore.listen(this.onAuthChange);

        var options = {
            language : config.auth.language,
            theme: {
                logo: config.auth.logo
            },
            languageDictionary: {
                title: config.auth.title
            },
            closable: true
        };
        // Configure Auth0
        this.lock = new Auth0Lock(config.auth.audience, config.auth.url, options);

        // Add callback for lock `authenticated` event
        this.lock.on('authenticated', this._doAuthentication.bind(this));
        // binds login functions to keep this context
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }
    componentWillUnmount() {
        AuthStore.unlisten(this.onAuthChange);
    }

    onAuthChange(state){
        this.setState({
            authenticated: state
        });
    }

    _doAuthentication(authResult){
        this.lock.getProfile(authResult.idToken, (error, profile) => {
            if (error) {
                toastr.error('Error loading the Profile');
            } else {
                AuthActions.login({profile: profile, token: authResult.idToken});
            }
        });
    }

    login() {
        // Call the show method to display the widget.
        this.lock.show()
    }

    logout(){
        AuthActions.logout();
    }

    render() {
        if (!AuthStore.getState().authenticated) {
            return (<li className="pull-right" onClick={this.login}><a>Login</a></li>);
        } else {
            return (<li><Link to='/' onClick={this.logout}>Uitloggen</Link></li>);
        }
    }
}

export default Login;