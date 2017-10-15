import React, {Component} from 'react';
import {MeetMode} from '../commons/const';


class Meet extends Component {
    render() {
        if (this.props.rendFlg == MeetMode) {
            return (
                <video autoPlay src={this.props.userVideoStream}></video>
            );
        }
        return null;
    }
}

export default Meet;
