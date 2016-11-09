// CORE
import React, { Component } from 'react';
// MATERIAL
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import NeutralFace from 'material-ui/svg-icons/social/sentiment-neutral';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

class KeymapList extends Component {

	constructor() {
		super();
		this.state = {
			keymapToDeleteIndex: null,
			keymapToEditIndex: null
		};
	}

	render(){

		let listItems;
		let nodeContent;

		if (this.props.keymaps.length !== 0) {
			listItems = this.props.keymaps.map((item, index) => {
				return (
					<ListItem
						key={index}
						primaryText={item.name}
						secondaryText={item.command}
						leftAvatar={<Avatar icon={<NeutralFace />} />}
						onTouchTap={() => this.props.handleKeymapIsClicked(index)}
					/>
				);
			});
			nodeContent =
				<Paper zDepth={1}>
					<List className="Keymaps__list" style={{background: 'white'}}>
						{listItems}
					</List>
				</Paper>;
		}
		else {
			nodeContent = <p>You haven't any keymaps.</p>;
		}
		return (
			<div>
				{nodeContent}
			</div>
		)
	}
}

export default KeymapList;
