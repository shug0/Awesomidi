import React, { Component } from 'react';
// MATERIAL
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class EditKeymapModal extends Component {

	constructor() {
		super();

		this.state = {
			keymapName: '',
			keymapCommand: ''
		};

		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleChangeCommand = this.handleChangeCommand.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillMount() {
		this.setState({
			keymapName: this.props.keymap.name,
			keymapCommand: this.props.keymap.command
		})
	}

	handleChangeName(event)  {
		this.setState({
			keymapName: event.target.value,
		});
	};

	handleChangeCommand(event) {
		this.setState({
			keymapCommand: event.target.value,
		});
	};

	handleClose() {
		this.props.closeModal();
	};

	handleSubmit() {
		const newKeymap = {
			name: this.state.keymapName,
			command: this.state.keymapCommand
		};
		this.props.editKeymap(this.props.index, newKeymap);
		this.props.closeModal();
	};


	render() {

		const formFilled =
			!(this.state.keymapName.length > 2 && this.state.keymapCommand.length > 2);

		const actions = [
			<FlatButton
				label="Cancel"
				primary={true}
				onTouchTap={this.handleClose}
			/>,
			<FlatButton
				label="Save"
				primary={true}
				disabled={formFilled}
				onTouchTap={this.handleSubmit}
			/>,
		];

		return (
			<div>
				<Dialog
					title="Edit this Keymap"
					actions={actions}
					modal={true}
					open={this.props.isEditIsClicked}
				>
					<TextField
						floatingLabelText="Name"
						value={this.state.keymapName}
						onChange={this.handleChangeName}
					/>
					<TextField
						floatingLabelText="Command"
						value={this.state.keymapCommand}
						onChange={this.handleChangeCommand}
					/>
				</Dialog>
			</div>
		);
	}
}
export default EditKeymapModal;