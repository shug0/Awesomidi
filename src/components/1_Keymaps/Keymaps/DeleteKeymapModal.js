import React, { Component } from 'react';
// MATERIAL
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {grey500, red500} from 'material-ui/styles/colors';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

class DeleteKeymapModal extends Component {

	constructor() {
		super();
		this.handleDelete = this.handleDelete.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	handleClose()  {
		this.setState({open: false});
		this.props.deleteModalIsClosed();
	};

	handleDelete() {
		this.props.removeKeymap(this.props.index);
		this.setState({open: false});
	};

	render() {

		const actions = [
			<FlatButton
				label="Nevermind"
				primary={false}
				onTouchTap={ this.handleClose }
			/>,
			<FlatButton
				label="Yep"
				primary={true}
				style={{color: red500 }}
				onTouchTap={this.handleDelete}
			/>,
		];

		return (
			<span>
				<DeleteIcon	color={grey500}	/>
				<Dialog
					title={"Do you really want to delete the " + this.props.name + ' keymap ?'}
					titleStyle={{fontWeight: 100}}
					actions={actions}
					modal={false}
					open={this.props.isClicked}
				/>
			</span>
		);
	}
}
export default DeleteKeymapModal;