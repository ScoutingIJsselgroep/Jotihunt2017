import React from 'react';
import {Link} from 'react-router';
import NavbarStore from '../stores/NavbarStore';
import AuthStore from '../stores/AuthStore';
import NavbarActions from '../actions/NavbarActions';
import Login from './Login';
import Passwords from './Passwords';

var config = require('./../../config');
var { loggedIn } = require('./../helpers/AuthService');

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navbar: NavbarStore.getState(),
      authenticated: AuthStore.getState(),
    };
    this.onNavbarChange = this.onNavbarChange.bind(this);
    this.onAuthChange = this.onAuthChange.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {

    NavbarStore.listen(this.onNavbarChange);
    NavbarStore.listen(this.onAuthChange);
    let socket = io.connect();

    socket.on('onlineUsers', (data) => {
      NavbarActions.updateOnlineUsers(data);
    });

    $(document).ajaxStart(() => {
      NavbarActions.updateAjaxAnimation('fadeIn');
    });

    $(document).ajaxComplete(() => {
      setTimeout(() => {
        NavbarActions.updateAjaxAnimation('fadeHalfOut');
      }, 750);
    });
  }

  update(){
    this.forceUpdate();
  }

  componentWillUnmount() {
    NavbarStore.unlisten(this.onNavbarChange);
    AuthStore.unlisten(this.onAuthChange);
  }

  onAuthChange(state){
    this.setState({
      authenticated: state
    });
    this.forceUpdate();
  }

  onNavbarChange(state) {
    this.setState({navbar: state});
  }

  render() {
    var navbar;
    if(loggedIn()){
      navbar =  <ul className='nav navbar-nav'>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/passwords'>Wachtwoorden</Link></li>
        <li className='dropdown'>
          <a href='#' className='dropdown-toggle' data-toggle='dropdown'>Over <span className='caret'></span></a>
          <ul className='dropdown-menu'>
            <li><Link to='/help'>Wat is Jotihunt?</Link></li>
            <li className='divider'></li>
            <li><Link to='/hint/list'>Lijst</Link></li>
            <li><Link to='/hint/map'>Kaart</Link></li>
          </ul>
        </li>
        <li className='dropdown'>
          <a href='#' className='dropdown-toggle' data-toggle='dropdown'>Hints <span className='caret'></span></a>
          <ul className='dropdown-menu'>
            <li><Link to='/hint/add'>Hint toevoegen</Link></li>
            <li className='divider'></li>
            <li><Link to='/hint/list'>Lijst</Link></li>
            <li><Link to='/hint/map'>Kaart</Link></li>
          </ul>
        </li>
        <li className='dropdown'>
          <a href='#' className='dropdown-toggle' data-toggle='dropdown'>Auto's <span className='caret'></span></a>
          <ul className='dropdown-menu'>
            <li><Link to='/cars/map'>Kaart</Link></li>
          </ul>
        </li>
        <li className='dropdown'>
          <a href='#' className='dropdown-toggle' data-toggle='dropdown'>Scoutinggroepen <span className='caret'></span></a>
          <ul className='dropdown-menu'>
            <li><Link to='/groups/list'>Lijst</Link></li>
            <li><Link to='/groups/map'>Kaart</Link></li>
          </ul>
        </li>
        <li><Link to='/massivemap'>Massive map</Link></li>
        <Login update={this.forceUpdate}/>
      </ul>;
    } else {
      navbar =  <ul className='nav navbar-nav'>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/help'>Help</Link></li>
        <Login update={this.forceUpdate} />
      </ul>;
    }
    return (
      <nav className='navbar navbar-default navbar-static-top'>
        <div className='navbar-header'>
          <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar'>
            <span className='sr-only'>Toggle navigation</span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
          </button>
          <Link to='/' className='navbar-brand'>

            <img src="/img/logo_64.png" className={'foxlogo animated ' + this.state.navbar.ajaxAnimationClass} />
            Jotihunt.JS
            <span className='badge badge-up badge-danger'>{this.state.navbar.onlineUsers}</span>
          </Link>
        </div>
        <div id='navbar' className='navbar-collapse collapse'>
          {navbar}
        </div>
      </nav>
    );
  }
}

export default Navbar;