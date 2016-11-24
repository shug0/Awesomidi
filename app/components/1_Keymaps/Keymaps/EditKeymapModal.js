import React, { Component } from 'react';
// MATERIAL
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
// Components
import EditAvatar from './EditAvatar';

class EditKeymapModal extends Component {

  constructor() {
    super();
    this.state = {
      open: true,
      openIconModal: false,
      name: '',
      command: '',
      keyID: '',
      iconClass: '',
      waitingInput: false,
    };
    this.handleChangeName     = this.handleChangeName.bind(this);
    this.handleChangeCommand  = this.handleChangeCommand.bind(this);
    this.handleSubmit         = this.handleSubmit.bind(this);
    this.handleDelete         = this.handleDelete.bind(this);
    this.handleBindMidiKey    = this.handleBindMidiKey.bind(this);
    this.handleError          = this.handleError.bind(this);
    this.handleOpenIconModal  = this.handleOpenIconModal.bind(this);
    this.handleCloseIconModal = this.handleCloseIconModal.bind(this);
    this.handleChangeIcon     = this.handleChangeIcon.bind(this);
  }

  componentWillMount() {
    if (this.props.action === 'edit') {
      this.setState({
        name: this.props.keymap.name,
        command: this.props.keymap.command,
        iconClass: this.props.keymap.iconClass,
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
      name: event.target.value,
    });
  };

  handleChangeCommand(event) {
    this.setState({
      command: event.target.value,
    });
  };

  handleChangeIcon(icon) {
    this.setState({
      iconClass: icon,
      openIconModal: false
    });
  }

  handleError(error) {
    console.log(error);
  }

  handleDelete() {
    this.props.removeKeymap(this.props.index);
    this.props.closeDialog();
  };

  handleSubmit() {
    const newKeymap = {
      name: this.state.name,
      command: this.state.command,
      iconClass: this.state.iconClass,
      keyID: this.state.keyID
    };
    this.props.action === 'edit' && this.props.index && this.props.editKeymap(this.props.index, newKeymap);
    this.props.action === 'add' && this.props.addKeymap(newKeymap);
    this.props.closeDialog();
  };

  handleOpenIconModal() {
    this.setState({
      openIconModal: true
    })
  }

  handleCloseIconModal() {
    this.setState({
      openIconModal: false
    })
  }

  render() {

    // If all the form are filled => true
    const formFilled = !(
      this.state.name.length > 2 &&
      this.state.command.length > 2 &&
      this.state.keyID !== null
    );

    // Assigning text depending on the action
    let titleText;
    let principalButtonText;

    if (this.props.action === 'add') {
      titleText = 'Add a new keymap';
      principalButtonText = 'Add';
    }
    if (this.props.action === 'edit') {
      titleText = 'Edit keymap';
      principalButtonText = 'Save';
    }

    // Changing text on the binding midi button
    const labelBindingKeyButton = () => {
      if (this.state.keyID === '' && !this.state.waitingInput) return 'Bind MIDI Key';
      if (this.state.keyID !== '' && !this.state.waitingInput) return 'Key : '+ this.state.keyID;
      if (this.state.waitingInput) return 'Press the key to assign...';
    };


    const actions = [
      <FlatButton
        label="Delete"
        style={{float: 'left'}}
        secondary={true}
        onTouchTap={this.handleDelete}
      />,
      <FlatButton
        label="Cancel"
        onTouchTap={this.props.closeDialog}
      />,
      <FlatButton
        label={principalButtonText}
        primary={true}
        disabled={formFilled}
        onTouchTap={this.handleSubmit}
      />,
    ];

    return (
      <div>
        <Dialog
          title={titleText}
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <EditAvatar
            iconClass={this.state.iconClass}
            open={this.state.openIconModal}
            handleChangeIcon={this.handleChangeIcon}
            requestOpen={this.handleOpenIconModal}
            requestClose={this.handleCloseIconModal}
          />
          <TextField
            floatingLabelText="Name"
            value={this.state.name}
            onChange={this.handleChangeName}
            style={{width: '100%'}}
          />
          <TextField
            floatingLabelText="Command"
            value={this.state.command}
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
