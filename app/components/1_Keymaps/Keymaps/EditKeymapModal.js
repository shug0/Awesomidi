import React, { Component } from 'react';
// MATERIAL
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class EditKeymapModal extends Component {

  constructor() {
    super();
    this.state = {
      open: true,
      keymapName: '',
      keymapCommand: '',
      keyID: '',
      waitingInput: false,
    };
    this.handleChangeName     = this.handleChangeName.bind(this);
    this.handleChangeCommand  = this.handleChangeCommand.bind(this);
    this.handleSubmit         = this.handleSubmit.bind(this);
    this.handleBindMidiKey    = this.handleBindMidiKey.bind(this);
    this.handleError          = this.handleError.bind(this);
  }

  componentWillMount() {
    if (this.props.action === 'edit') {
      this.setState({
        keymapName: this.props.keymap.name,
        keymapCommand: this.props.keymap.command,
        keyID: this.props.keymap.keyID,
      });
    }
  }

  componentDidMount() {
    this.props.stopExecuteBindings();
  }

  componentWillUnmount() {
    this.props.startExecuteBindings();
  }

  componentWillReceiveProps(nextProps) {
    this.handleMidiEvent(nextProps);
  }

  handleMidiEvent(nextProps) {
    if (this.state.waitingInput &&
      nextProps.events[nextProps.events.length-1].action === 'keyUp') {

      const redundancyKeymaps = this.props.keymaps.filter((keymap) => {
        return(keymap.keyID === nextProps.events[nextProps.events.length-1].key);
      }).length;

      if (redundancyKeymaps === 0) {
        this.setState({
          waitingInput: false,
          keyID: nextProps.events[nextProps.events.length-1].key
        });
        this.props.stopListeningEvents();
      }
      else {
        this.handleError('This key is already used.')
      }
    }
  }

  handleBindMidiKey() {
    this.props.startListeningEvents();
    this.setState({
      waitingInput: true,
      keyID: ''
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

  handleError(error) {
    console.log(error);
  }

  handleSubmit() {
    const newKeymap = {
      name: this.state.keymapName,
      command: this.state.keymapCommand,
      keyID: this.state.keyID
    };

    if (this.props.action === 'edit' && this.props.index) {
      this.props.editKeymap(this.props.index, newKeymap);
    }
    if (this.props.action === 'add') {
      this.props.addKeymap(newKeymap);
    }

    this.props.closeDialog();
  };

  render() {

    // If all the form are filled => true
    const formFilled = !(
      this.state.keymapName.length > 2 &&
      this.state.keymapCommand.length > 2 &&
      this.state.keyID !== null
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
      if (this.state.keyID === '' && !this.state.waitingInput) return 'Bind MIDI Key';
      if (this.state.keyID !== '' && !this.state.waitingInput) return 'Key : '+ this.state.keyID;
      if (this.state.waitingInput) return 'Press the key to assign...';

    };

    let title;
    if (this.props.action === 'add') title = 'Add a new keymap';
    if (this.props.action === 'edit') title = 'Edit keymap';


    return (
      <div>
        <Dialog
          title={title}
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
export default EditKeymapModal;
