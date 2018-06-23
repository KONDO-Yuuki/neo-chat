import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import Card, {CardContent} from 'material-ui/Card';
import Button from 'material-ui/Button';


class Connector extends Component {

    handleClickConnect = () => {
        this.props.nextMode()
        this.props.tryConnect()

    }

    render() {
        return (
            <div>
                <Card>
                    <CardContent>
                        【your id】{this.props.userId}
                    </CardContent>
                </Card>
                <TextField
                    id="name"
                    label="Dear Id"
                    onChange={(event) => {
                        this.props.dearIdChange(event.target.value)
                    }}
                    margin="normal"
                />
                <Button raised color="accent" onClick={this.handleClickConnect}>
                    接続
                </Button>
            </div>
        );
    }
}

export default Connector;
