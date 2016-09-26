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
            closable: false
        };
        // Configure Auth0
        this.lock = new Auth0Lock(config.auth.audience, config.auth.url, options);

        // Add callback for lock `authenticated` event
        this.lock.on('authenticated', this._doAuthentication.bind(this));
        // binds login functions to keep this context
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
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
            return (<li className='dropdown pull-right'>
                <a href='#' className='dropdown-toggle' data-toggle='dropdown'>Account <span className='caret'></span></a>
                <ul className='dropdown-menu'>
                    <li><Link to='/hint/add'>Opties</Link></li>
                    <li className='divider'></li>
                    <li><Link to='/' onClick={this.logout}>Uitloggen</Link></li>
                </ul>
            </li>);
        }
    }
}

export default Login;