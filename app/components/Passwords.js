import React from 'react';

var config = require('./../../config');

class Help extends React.Component {

  constructor (props) {
    super(props);
  }

  render () {
      var trs = [];
      for (var i in config.passwords){
        trs.push(
            <tr>
                <td>{config.passwords[i].name}</td>
                <td>{config.passwords[i].username}</td>
                <td>{config.passwords[i].password}</td>
                <td><a className="btn btn-default" href={config.passwords[i].url}>Ga naar de website</a></td>
            </tr>
        );
      }
    return (
        <div className='container'>
            <div className='row fadeInUp animated'>
                <div className='col-sm-12 col-md-8 col-md-offset-2'>
                    <div className='panel panel-default'>
                        <div className='panel-body'>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>
                                        Website
                                    </th>
                                    <th>
                                        Gebruikersnaam
                                    </th>
                                    <th>
                                        Wachtwoord
                                    </th>
                                    <th>
                                        Link
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {trs}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default Help;