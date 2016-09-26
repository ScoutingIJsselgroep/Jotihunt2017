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
            console.log(data);
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
        console.log(this.state.foxstatus.subareas);
        for (i in this.state.foxstatus.subareas) {
            foxlist.push(
                <td>
                    {this.state.foxstatus.subareas[i].team}
                    {this.state.foxstatus.subareas[i].status}
                </td>
            );
        }
        return (

            <div className='row fadeInUp animated'>
                <div className='col-sm-12'>
                    <div className='panel panel-default'>
                        <div className='panel-body'>
                            <table className="table">
                                <tbody>
                                <tr>
                                {foxlist}
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default ListHint;