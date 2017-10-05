import React, {Component} from 'react';
import Standby from "./components/Standby";
import Chat from './components/Chat'
import GoodNight from "./components/GoodNight";
import {ChatMode, StandbyMode, GoodNightMode} from './commons/symbols'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            route: StandbyMode
        }
    }

    render() {
        const currentRoute = () => {
            switch (this.state.route) {
                case ChatMode:
                    return <Chat/>
                case GoodNightMode:
                    return <GoodNight/>
                case StandbyMode:
                default:
                    return <Standby/>

            }
        }
        return (
            <div>
                {currentRoute()}
            </div>
        );
    }
}

console.log('Thank you my best friends!')
export default App;
