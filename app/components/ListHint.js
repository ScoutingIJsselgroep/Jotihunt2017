import React from 'react';
import HintListStore from '../stores/HintListStore';
import HintListActions from '../actions/HintListActions';
import PointLayer from './PointLayer';


import {Gmaps, Marker, InfoWindow} from 'react-gmaps';

var config = require('./../../config');

class ListHint extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      hintlist: HintListStore.getState(),
    };
    this.onHintListChange = this.onHintListChange.bind(this);
  }

  componentDidMount() {
    HintListStore.listen(this.onHintListChange);
    HintListActions.getHints();
  }

  componentWillUnmount() {
    HintListStore.unlisten(this.onHintListChange);
  }

  onHintListChange (state) {
    this.setState({
      hintlist: state,
    });
  }

  refresh() {
    HintListActions.getHints();
  }

  render () {
    var hintlist = [];
    let i;
    for (i in this.state.hintlist.hintlist){
      hintlist.push(
          <div>
            {this.state.hintlist.hintlist[i].wsgx}
          </div>
      );
    }
    return (
      <div className='container'>
        <div className='row fadeInUp animated'>
          <div className='col-sm-12'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Hints in een lijst
                &nbsp; <small onClick={this.refresh}><i className="fa fa-refresh" aria-hidden="true"></i>
                  Refresh</small></div>
              <div className='panel-body'>
                {hintlist}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListHint;