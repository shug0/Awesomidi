import React, { Component } from 'react';
// MATERIAL
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';

class AddKeymaps extends Component {

	constructor() {
		super();

		this.state = {
			open: false,
			keymapName: '',
			keymapCommand: ''
		};

	}

	handleChangeName = (event) => {
		this.setState({
			keymapName: event.target.value,
		});
	};

	handleChangeCommand = (event) => {
		this.setState({
			keymapCommand: event.target.value,
		});
	};

	handleOpen = () => {
		this.setState({open: true});
	};

	handleClose = () => {
		this.setState({open: false});
	};

	handleSubmit = () => {
		const newKeymap = {
			name: this.state.keymapName,
			command: this.state.keymapCommand
		};
		this.props.addKeymap(newKeymap);
		this.setState({open: false});
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
				label="Add"
				primary={true}
				disabled={formFilled}
				onTouchTap={this.handleSubmit}
			/>,
		];

		return (
			<div>
				<FloatingActionButton
					className='Keymaps__floatingButton'
					onTouchTap={this.handleOpen}>
					<ContentAdd />
				</FloatingActionButton>

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
export default AddKeymaps;