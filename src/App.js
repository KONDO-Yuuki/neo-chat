import React, {Component} from 'react';
import Standby from "./modes/Standby";
import Meet from './modes/Meet'
import Finish from "./components/GoodNight";
import {MeetMode, StandbyMode, FinishMode, TopMode} from './commons/const'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Top from "./modes/Top";
import TextChat from "./components/TextChat";
import webRTCManager from './managers/webRTCManager'
import UserVideo from './components/UserVideo'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            route: TopMode,
            userVoice: null,
            dearVoice: null,
            localStream: null,    // 自分の映像ストリーム
            connectedCall: null,  // 接続したコール
            userId: '', //自分のid
            dearId: '', //相手のid
            userVideoStream: null, // 自分のビデオストリーム
            dearVideoStream: null // 相手のビデオストリーム
        }
        this.webRTCManager = new webRTCManager();
    }

    componentWillMount() {
        this.webRTCManager.connectSignal(this.setUserId)
        this.webRTCManager.getStream(true, this.setUserVideoStream)
        this.webRTCManager.setMeet(this.dearIdChange, this.state.localStream,
            this.setConnectedCall, this.setDearVideo, this.goMeet)
    }

    setUserId = (uid) => {
        this.setState({userId: uid})
    }

    setConnectedCall = (call) => {
        this.setState({connectedCall: call})
    }
    goStandby = () => {
    }

    goMeet = () => {
        this.setState({route: MeetMode})
    }

    goFinish = () => {
        this.setState({route: FinishMode})
    }

    dearIdChange = (id) => {
        this.setState({dearId: id})
    }

    setDearVideo = (stream) => {
        this.setState({dearVideoStream: stream})
    }

    tryConnect = () => {
        this.webRTCManager.connectStart(this.state.dearId, this.state.localStream, this.setDearVideo)
    }


    setUserVideoStream = (src) => {
        this.setState({
            localStream: src,
            userVideoStream: this.webRTCManager.createObjectURL(src)
        })
    }

    render() {
        const deprecatedCurrentRoute = () => {
            switch (this.state.route) {
                case StandbyMode:
                    return <Standby
                        rendFlg={this.state.route}
                        nextMode={this.goMeet}
                        setUserVoice={this.saveUserVoice}/>
                case FinishMode:
                    return <Finish
                        rendFlg={this.state.route}/>
                default:
                    return null
            }
        }
        const hasChat =
            this.state.route === StandbyMode ||
            this.state.route === MeetMode
        return (
            <div>
                <AppBar position="static" color="default">
                    <Toolbar>
                        寝落ちゃっと
                    </Toolbar>
                </AppBar>
                <UserVideo
                    rendFlg={this.state.route}
                    userVideoStream={this.state.userVideoStream}
                />
                <Top
                    rendFlg={this.state.route}
                    nextMode={this.goMeet}
                    tryConnect={this.tryConnect}
                    userId={this.state.userId}
                    dearIdChange={this.dearIdChange}
                />
                <Meet
                    rendFlg={this.state.route}
                    nextMode={this.goFinish}
                    dearVideoStream={this.state.dearVideoStream}/>
                {deprecatedCurrentRoute()}
                {hasChat ? <TextChat/> : null}
            </div>
        );
    }
}

export default App;
