import React, { Component } from 'react';
import Recorder from "../components/Recorder";

class Standby extends Component {
    render() {
        return (
            <p>
                <Recorder {...this.props}/>
            </p>
        );
    }
}

export default Standby;
