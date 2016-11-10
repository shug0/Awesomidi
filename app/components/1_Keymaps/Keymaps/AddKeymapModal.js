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
      keymapID: ''
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeCommand = this.handleChangeCommand.bind(this);
    this.handleChangeID = this.handleChangeID.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleChangeID(event) {
    this.setState({
      keymapID: event.target.value,
    });
  };

  handleSubmit() {
    const newKeymap = {
      name: this.state.keymapName,
      command: this.state.keymapCommand,
      ID: this.state.keymapKeyID
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
            label="Bind MIDI Key"
            labelPosition="before"
            containerElement="label"
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
