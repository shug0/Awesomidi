// CORE
import React, { Component } from 'react';
// MATERIAL
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import NeutralFace from 'material-ui/svg-icons/social/sentiment-neutral';
import Paper from 'material-ui/Paper';


class KeymapList extends Component {
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
			</div>
		)
	}
}

export default KeymapList;