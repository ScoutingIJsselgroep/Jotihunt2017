import React from 'react';
import FoxStatusStore from '../stores/FoxStatusStore';
import FoxStatusAction from '../actions/FoxStatusAction';

var config = require('./../../config');

class ListHint extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            foxstatus: FoxStatusStore.getState(),
        };
        this.onFoxStatusChange = this.onFoxStatusChange.bind(this);
    }

    componentDidMount() {
        let socket = io.connect();

        FoxStatusStore.listen(this.onFoxStatusChange);
        FoxStatusAction.getFoxStatus();
        socket.on('foxStatus', (data) => {
            FoxStatusAction.updateFoxStatus(data);
        });
    }

    componentWillUnmount() {
        FoxStatusStore.unlisten(this.onFoxStatusChange);
    }

    onFoxStatusChange(state) {
        this.setState({
            foxstatus: state
        });
    }

    render() {
        var foxlist = [];
        let i;
        for (i in this.state.foxstatus.subareas) {
            var className;
            if (this.state.foxstatus.subareas[i].status == "rood") {
                className = "btn-danger";
            } else if (this.state.foxstatus.subareas[i].status == "oranje") {
                className = "btn-warning";
            } else if (this.state.foxstatus.subareas[i].status == "groen") {
                className = "btn-success";
            }
            foxlist.push(
                <td>
                    <button type="button" className={'btn btn-lg btn-block ' + className}>
                        {this.state.foxstatus.subareas[i].team}
                    </button>
                </td>
            );
        }
        return (

            <div className='row fadeInUp animated'>
                <div className='col-sm-12'>
                    <table className="table">
                        <tbody>
                        <tr>
                            {foxlist}
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        );
    }
}

export default ListHint;