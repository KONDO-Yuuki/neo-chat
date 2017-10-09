import React, { Component } from 'react';
import Info from '../parts/Info'
import Connector from "../parts/Connector";
class Top extends Component {
    render() {
        return (
            <div>
                <Info/>
                <Connector/>
            </div>
        );
    }
}

export default Top;
