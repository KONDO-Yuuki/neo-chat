import React, {Component} from 'react';
import Info from '../components/Info'
import Connector from "../components/Connector";
import {TopMode} from '../commons/const';

class Top extends Component {

    render() {
        if (this.props.rendFlg === TopMode) {
            return (
                <div>
                    <Info/>
                    <Connector{...this.props}/>
                </div>
            );
        }
        return null;
    }
}

export default Top;
