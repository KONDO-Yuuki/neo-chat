import React, {Component} from 'react';
import Standby from "./modes/Standby";
import Meet from './modes/Meet'
import Finish from "./parts/GoodNight";
import {MeetMode, StandbyMode, FinishMode, TopMode} from './commons/symbols'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Top from "./modes/Top";
import TextChat from "./parts/TextChat";

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            route: FinishMode
        }
    }

    render() {
        const currentRoute = () => {
            switch (this.state.route) {
                case MeetMode:
                    return <Meet/>
                case FinishMode:
                    return <Finish/>
                case StandbyMode:
                    return <Standby/>
                case TopMode:
                default:
                    return <Top/>
            }
        }
        const hasChat =
            this.state.route === StandbyMode ||
            this.state.route === MeetMode
        return (
            <div>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Typography type="title" color="inherit">
                            寝落ちゃっと
                        </Typography>
                    </Toolbar>
                </AppBar>
                {currentRoute()}
                {hasChat ? <TextChat/> : null}
            </div>
        );
    }
}

console.log('Thank you my best friends!')
export default App;
