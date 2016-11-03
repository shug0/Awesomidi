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
import AddKeymaps from './AddKeymaps';

class KeymapList extends Component {

	constructor() {
		super();
		this.state = {
			deletedIndex: null
		};
		this.handleIconDeleteIsClicked = this.handleIconDeleteIsClicked.bind(this);
		this.handleModalIsClosed = this.handleModalIsClosed.bind(this);
	}

	handleModalIsClosed() {
		this.setState({
			deletedIndex: null
		})
	}

	handleIconDeleteIsClicked(index) {
		this.setState({
			deletedIndex: index,
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
						rightIconButton={
							<IconButton
								onTouchTap={() => this.handleIconDeleteIsClicked(index)}
								children={
									<DeleteKeymapModal
										index={index}
										name={item.name}
										isClicked={index === this.state.deletedIndex}
										deleteModalIsClosed={this.handleModalIsClosed}
										removeKeymap={this.props.removeKeymap}
									/>
								}
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