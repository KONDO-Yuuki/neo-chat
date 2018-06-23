import React, {Component} from 'react';
import {MeetMode} from '../commons/const';


class Meet extends Component {
    render() {
        if (this.props.rendFlg === MeetMode) {
            return (
                <video autoPlay src={this.props.dearVideoStream}></video>
            );
        }
        return null;
    }
}

export default Meet;
