import React from 'react';

var config = require('./../../config');

class Help extends React.Component {

  constructor (props) {
    super(props);
  }

  render () {
    return (
        <div className='container'>
            <h1 className='text-center'><a href={config.form} type="button" className="btn btn-primary btn-lg">Ik geef mij op om mee te rijden!</a></h1>
            <div className='row fadeInUp animated'>
                <div className='col-sm-12 col-md-8 col-md-offset-2'>
                    <div className='panel panel-default'>
                        <div className='panel-body videocontainer'>
                            <iframe width="100%" height="auto" src="https://www.youtube.com/embed/xfl00rFqq2A?autoplay=1&controls=0&showinfo=0&rel=0" frameBorder="0" allowFullscreen></iframe>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row fadeInUp animated'>
                <div className='col-sm-12'>
                    <div className='panel panel-default'>
                        <div className='panel-body'>
                            <h1>Wat verwachten wij?</h1>
                            <p>Het zou fijn zijn als je een paar uur kunt helpen! Vorig jaar zijn we als 27e geeindigt
                            en we willen natuurlijk nog veel hoger eindigen! We stellen enkele eisen: </p>
                            <ul>
                                <li>
                                    's Nachts rijden? Dan heb je drie jaar je rijbewijs nodig.
                                </li>
                                <li>
                                    Heel veel zin om vossen te vangen.
                                </li>
                            </ul>
                            <h2>Vorige keer was het stom, we hebben toen niks gevangen...</h2>
                            <p>
                                Ja, maar dit keer gaat dat anders! Vorig jaar is er maar één auto op pad gegaan die
                                niks gevangen heeft! Dit kwam door nieuwe communicatietechnieken. Deze zijn nu nog
                                beter geworden. <b>Succes is dus gegarandeerd</b>!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className='text-center'><a href={config.form} type="button" className="btn btn-primary btn-lg">Ik geef mij op om mee te rijden!</a></h1>
        </div>
    );
  }
}

export default Help;