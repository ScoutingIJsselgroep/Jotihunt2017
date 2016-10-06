import React from 'react';

var config = require('./../../config');

class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='container'>
                <h1 className='text-center'>Het is het jaar van de vos.</h1>
                <p className='text-center'>Vorig jaar waren Scouting de Witte Wieven en Scouting IJsselgroep op zoek
                    naar Droids.
                    Nu hebben we ons jachtsysteem geperfectioneerd en gaan we nóg harder jagen op vossen.</p>
                <div className='row text-center'>
                    <img className="maxhundred" src="/img/logo.png"/>
                </div>
            </div>
        );
    }
}

export default Home;