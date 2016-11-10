import React, { Component } from 'react';
// MATERIAL
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class AddKeymapModal extends Component {

  constructor() {
    super();
    this.state = {
      open: true,
      keymapName: '',
      keymapCommand: '',
      keymapID: '',
      waitingInput: false,
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeCommand = this.handleChangeCommand.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBindMidiKey = this.handleBindMidiKey.bind(this);
  }

  componentDidMount() {
    this.props.stopExecuteBindings();
  }

  componentWillUnmount() {
    this.props.startExecuteBindings();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.waitingInput &&
      nextProps.events[nextProps.events.length-1].action === 'keyUp') {
      this.setState({
        waitingInput: false,
        keymapID: nextProps.events[nextProps.events.length-1].key
      });
      this.props.stopListeningEvents();
    }
  }

  handleBindMidiKey() {
    this.props.startListeningEvents();
    this.setState({
      waitingInput: true,
    });
  }

  handleChangeName(event) {
    this.setState({
      keymapName: event.target.value,
    });
  };

  handleChangeCommand(event) {
    this.setState({
      keymapCommand: event.target.value,
    });
  };

  handleSubmit() {
    const newKeymap = {
      name: this.state.keymapName,
      command: this.state.keymapCommand,
      keyID: this.state.keymapID
    };
    this.props.addKeymap(newKeymap);
    this.props.closeDialog();
  };

  render() {

    // If all the form are filled => true
    const formFilled = !(
      this.state.keymapName.length > 2 &&
      this.state.keymapCommand.length > 2 &&
      this.state.keymapKeyID !== null
    );

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.closeDialog}
      />,
      <FlatButton
        label="Add"
        primary={true}
        disabled={formFilled}
        onTouchTap={this.handleSubmit}
      />,
    ];

    const labelBindingKeyButton = () => {
      if (this.state.keymapID === '' && !this.state.waitingInput) {
        return 'Bind MIDI Key';
      }
      if (this.state.keymapID !== '' && !this.state.waitingInput) {
        return 'Key : '+ this.state.keymapID;
      }
      if (this.state.waitingInput) {
        return 'Press the key to assign...';
      }
    };

    return (
      <div>
        <Dialog
          title="New Keymap"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <TextField
            floatingLabelText="Name"
            value={this.state.keymapName}
            onChange={this.handleChangeName}
            style={{width: '100%'}}
          />
          <TextField
            floatingLabelText="Command"
            value={this.state.keymapCommand}
            onChange={this.handleChangeCommand}
            style={{width: '100%'}}
          />
          <RaisedButton
            label={labelBindingKeyButton()}
            labelPosition="before"
            containerElement="label"
            onTouchTap={this.handleBindMidiKey}
            disableTouchRipple
            style={{
              marginTop: '1em'
            }}
          />
        </Dialog>
      </div>
    );
  }
}
export default AddKeymapModal;
