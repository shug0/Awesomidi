// CORE
import React, { Component } from 'react';
// MATERIAL
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import NeutralFace from 'material-ui/svg-icons/social/sentiment-neutral';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';

// COMPONENTS
import DeleteKeymapModal from './DeleteKeymapModal';
import EditKeymapModal from './EditKeymapModal';
import AddKeymaps from './AddKeymap';

class KeymapList extends Component {

	constructor() {
		super();
		this.state = {
			keymapToDeleteIndex: null,
			keymapToEditIndex: null
		};
		this.handleIconDeleteIsClicked = this.handleIconDeleteIsClicked.bind(this);
		this.handleKeymapIsClicked = this.handleKeymapIsClicked.bind(this);
		this.handleModalIsClosed = this.handleModalIsClosed.bind(this);
	}

	handleModalIsClosed() {
		this.setState({
			keymapToDeleteIndex: null,
			keymapToEditIndex: null
		})
	}

	handleIconDeleteIsClicked(index) {
		this.setState({
			keymapToDeleteIndex: index,
		});
	}

	handleKeymapIsClicked(index) {
		this.setState({
			keymapToEditIndex: index
		});
	}

	render(){

		let listItems;
		let nodeContent;

		if (this.props.keymaps.length > 0) {
			listItems = this.props.keymaps.map((item, index) => {

				return (
					<ListItem
						key={index}
						primaryText={item.name}
						secondaryText={item.command}
						leftAvatar={<Avatar icon={<NeutralFace />} />}
						onTouchTap={() => this.handleKeymapIsClicked(index)}
						rightIconButton={
							<IconButton
								onTouchTap={() => this.handleIconDeleteIsClicked(index)}
								children={[
									<DeleteKeymapModal
										index={index}
										key={"deleteModal-"+index}
										name={item.name}
										isDeleteIsClicked={index === this.state.keymapToDeleteIndex}
										closeModal={this.handleModalIsClosed}
										removeKeymap={this.props.removeKeymap}
									/>,
									<EditKeymapModal
										index={index}
										key={"editModal-"+index}
										keymap={item}
										isEditIsClicked={index === this.state.keymapToEditIndex}
										closeModal={this.handleModalIsClosed}
										editKeymap={this.props.editKeymap}
									/>
								]}
							/>
						}
					/>
				);
			});
			nodeContent =
				<Paper zDepth={1}>
					<List className="Keymaps__list">{listItems}</List>
				</Paper>;
		}
		else {
			nodeContent = <p>You haven't any keymaps.</p>;
		}


		return (
			<div>
				{nodeContent}
				<AddKeymaps
					addKeymap={this.props.addKeymap}
				/>
			</div>
		)
	}
}

export default KeymapList;