import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {StandbyMode, MeetMode} from '../commons/const';

class UserVideo extends Component {

    render() {
        if (this.props.rendFlg === MeetMode) {
            return (
                <video autoPlay="true" src={this.props.userVideoStream}></video>
            );
        }
        return null;
    }
}

export default UserVideo;
