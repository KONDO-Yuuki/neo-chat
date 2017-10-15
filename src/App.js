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
        this.webRTCManager.setMeet()
        this.webRTCManager.getStream(true, this.setUserVideoStream)
    }

    setUserId = (uid) => {
        this.setState({userId: uid})
    }


    goStandby = () => {
        // let stream
        // new Promise(() => {
        //     stream = this.webRTCManager.getStream()
        // }).then(() => {
        //     this.setState({
        //         localStream: stream,
        //         route: StandbyMode
        //     })
        // })
    }

    goMeet = () => {
        this.setState({route: MeetMode})
    }

    goFinish = () => {
        this.setState({route: FinishMode})
    }

    dearIdChange = (id) => {
        this.setState({peerId: id})
    }

    tryConnect = () => {
        this.webRTCManager.connectStart(this.state.dearId)
    }

    setUserVideoStream = (src) => {
        this.setState({
            localStream: src,
            userVideoStream: this.webRTCManager.createObjectURL(src)
        })
    }

    render() {
        const currentRoute = () => {
            switch (this.state.route) {
                case StandbyMode:
                    return <Standby
                        rendFlg={this.state.route}
                        nextMode={this.goMeet}
                        setUserVoice={this.saveUserVoice}/>
                case MeetMode:
                    return
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
                    userId={this.state.userId}
                    dearIdChange={this.dearIdChange}
                />
                <Meet
                    rendFlg={this.state.route}
                    nextMode={this.goFinish}
                    userVideoStream={this.state.userVideoStream}/>
                {currentRoute()}
                {hasChat ? <TextChat/> : null}
            </div>
        );
    }
}

console.log('Thank you my best friends!')
export default App;
