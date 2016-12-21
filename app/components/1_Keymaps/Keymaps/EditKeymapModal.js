import React, { Component } from 'react';
// MATERIAL
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
// Components
import EditAvatar from './EditAvatar';
import EditMidiKey from './EditMidiKey';

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
    };
    this.handleChangeName     = this.handleChangeName.bind(this);
    this.handleChangeCommand  = this.handleChangeCommand.bind(this);
    this.handleChangeKey      = this.handleChangeKey.bind(this);
    this.handleSubmit         = this.handleSubmit.bind(this);
    this.handleDelete         = this.handleDelete.bind(this);
    this.handleOpenIconModal  = this.handleOpenIconModal.bind(this);
    this.handleCloseIconModal = this.handleCloseIconModal.bind(this);
    this.handleChangeIcon     = this.handleChangeIcon.bind(this);
  }

  componentWillMount() {
    if (this.props.dialog.dialogType === 'editKeymap') {
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

  handleChangeKey(key) {
    this.setState({
      keyID: key,
    });
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
    this.props.dialog.dialogType === 'editKeymap' && this.props.index && this.props.editKeymap(this.props.index, newKeymap);
    this.props.dialog.dialogType === 'addKeymap' && this.props.addKeymap(newKeymap);
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

    const { dialog } = this.props;
    const { name, command, keyID, iconClass, open, openIconModal } = this.state;

    // If all the form are filled => true
    const formFilled = !(
      name.length > 2 &&
      command.length > 2 &&
      keyID !== null
    );

    // Assigning text depending on the action
    let titleText;
    let principalButtonText;

    if (dialog.dialogType === 'addKeymap') {
      titleText = 'Add a new keymap';
      principalButtonText = 'Add';
    }
    if (dialog.dialogType === 'editKeymap') {
      titleText = 'Edit keymap';
      principalButtonText = 'Save';
    }

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
          open={open}
        >
          <EditAvatar
            iconClass={iconClass}
            open={openIconModal}
            handleChangeIcon={this.handleChangeIcon}
            requestOpen={this.handleOpenIconModal}
            requestClose={this.handleCloseIconModal}
          />
          <TextField
            floatingLabelText="Name"
            value={name}
            onChange={this.handleChangeName}
            style={{width: '100%'}}
          />
          <TextField
            floatingLabelText="Command"
            value={command}
            onChange={this.handleChangeCommand}
            style={{width: '100%'}}
          />

          <EditMidiKey {...this.props} keyID={this.state.keyID} />

        </Dialog>
      </div>
    );
  }
}
export default EditKeymapModal;
