import React from 'react';
import GetMapComponentsStore from '../stores/GetMapComponentsStore';
import GetMapComponentsActions from '../actions/GetMapComponentsActions';

import JHKmlLayer from './JHKmlLayer';

import {Gmaps, Marker, InfoWindow} from 'react-gmaps';

var config = require('./../../config');

class AddHint extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      mapConstructor: GetMapComponentsStore.getState(),
    };
    this.onMapComponentsChange = this.onMapComponentsChange.bind(this);
  }

  componentDidMount() {
    GetMapComponentsStore.listen(this.onMapComponentsChange);
    GetMapComponentsActions.getFilteredMapComponents(this.state.mapConstructor.filter);
  }

  componentWillUnmount() {
    GetMapComponentsStore.unlisten(this.onMapComponentsChange);
  }

  onMapComponentsChange (state) {
    this.setState({
      mapConstructor: state
    });
  }

  filter (event) {
    GetMapComponentsActions.getFilteredMapComponents(event.target.value);
  }

  render () {
    var groupList = [];
    let i;
    for (i in this.state.mapConstructor.filtered){
      if (this.state.mapConstructor.filtered[i].geometry.type == "Point") {
        groupList.push(
            <tr>
              <td>
                {this.state.mapConstructor.filtered[i].properties.name}
              </td>
              <td>
                {this.state.mapConstructor.filtered[i].properties.subarea}
              </td>
              <td dangerouslySetInnerHTML={{__html: this.state.mapConstructor.filtered[i].properties.extended}}/>
            </tr>
        );
      }
    }
    return (
      <div className='container'>
        <div className='row fadeInUp animated'>
          <div className='col-sm-12'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Lijst van scoutinggroepen
                <input type="textbox" className="form-control" placeholder="Zoeken. Tip: vul 'Alpha' in." value={this.state.mapConstructor.filter} onChange={this.filter}/>
              </div>
              <div className='panel-body'>
                <table className="table">
                  <thead>
                  <tr>
                    <th>
                      Groepnaam
                    </th>
                    <th>
                      Deelgebied
                    </th>
                    <th>
                      Locatie
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  {groupList}
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

export default AddHint;