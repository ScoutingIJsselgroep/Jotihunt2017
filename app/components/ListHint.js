import React from 'react';
import HintListStore from '../stores/HintListStore';
import HintListActions from '../actions/HintListActions';
import PointLayer from './PointLayer';


import {Gmaps, Marker, InfoWindow} from 'react-gmaps';
var moment = require('moment');

var config = require('./../../config');

class ListHint extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hintlist: HintListStore.getState(),
        };
        this.onHintListChange = this.onHintListChange.bind(this);
    }

    componentDidMount() {
        HintListStore.listen(this.onHintListChange);
        HintListActions.getHints(this.state.hintlist.search);
        let socket = io.connect();
        socket.on('updateHint', (data) => {
            HintListActions.getHints();
        });
    }

    componentWillUnmount() {
        HintListStore.unlisten(this.onHintListChange);
    }

    onHintListChange(state) {
        this.setState({
            hintlist: state
        });
    }

    refresh() {
        HintListActions.getHints(this.state.hintlist.search);
    }

    search(event) {
        HintListActions.getHints(event.target.value)
    }

    deleteHint(id) {
        HintListActions.deleteHint(id);
        HintListActions.getHints(this.state.hintlist.search);
    }

    render() {
        var hintlist = [];
        let i;
        for (i in this.state.hintlist.hintlist) {
            hintlist.push(
                <tr>
                    <td>
                        {this.state.hintlist.hintlist[i].subarea}
                    </td>
                    <td>
                        {moment(this.state.hintlist.hintlist[i].created_at).format("ddd HH:mm")}
                    </td>
                    <td>
                        {this.state.hintlist.hintlist[i].location}
                    </td>
                    <td>
                        {this.state.hintlist.hintlist[i].rdx} / {this.state.hintlist.hintlist[i].rdy}
                    </td>
                    <td>
                        <button onClick={this.deleteHint.bind(this, this.state.hintlist.hintlist[i]._id)}>Verwijder
                        </button>
                    </td>
                </tr>
            );
        }
        return (
            <div className='container' lock={this.lock}>
                <div className='row fadeInUp animated'>
                    <div className='col-sm-12'>
                        <div className='panel panel-default'>
                            <div className='panel-heading'>Hints in een lijst
                                &nbsp;
                                <button className="btn btn-sm btn-default pull-right" onClick={this.refresh.bind(this)}><i
                                    className="fa fa-refresh" aria-hidden="true"></i>
                                    Refresh
                                </button>
                                <input type="textbox" className="form-control" placeholder="Zoeken" onChange={this.search} value={this.state.hintlist.search}/>

                            </div>
                            <div className='panel-body'>
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th>
                                            Deelgebied
                                        </th>
                                        <th>
                                            Tijd
                                        </th>
                                        <th>
                                            Locatie
                                        </th>
                                        <th>
                                            Rijksdriehoek
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {hintlist}
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

export default ListHint;