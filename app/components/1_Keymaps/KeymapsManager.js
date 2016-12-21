// CORE
import React, { Component } from 'react';
// Material
import {grey900} from 'material-ui/styles/colors';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

// Components
import EditKeymapModal from './Keymaps/EditKeymapModal';

import KeymapsList from './Keymaps/KeymapList';

import MidiListener from '../3_Midi/MidiListener';

class KeymapsManager extends Component {

  constructor() {
    super();
    this.state = {
      indexToEdit: null
    };
    this.handleAddKeymap = this.handleAddKeymap.bind(this);
    this.handleEditKeymap = this.handleEditKeymap.bind(this);
  }

  handleAddKeymap() {
    this.props.showDialog('addKeymap');
  }

  handleEditKeymap(index) {
    this.setState({
      indexToEdit: index,
    });
    this.props.showDialog('editKeymap');
  }

	render() {

		return (

			<section className='wrapper' style={{marginTop: '2em'}}>
				<h2 style={{color: grey900}}>Keymaps List</h2>

        <KeymapsList
          {...this.props}
          handleKeymapIsClicked={this.handleEditKeymap}
        />

        <FloatingActionButton
          style={{ position: 'fixed', bottom: '2em', right: '2em' }}
          onTouchTap={this.handleAddKeymap}
          disableTouchRipple
        >
          <ContentAdd />
        </FloatingActionButton>

        {this.props.dialog.dialogType === 'addKeymap' &&
          <EditKeymapModal
            {...this.props}
          />
        }

        {this.props.dialog.dialogType === 'editKeymap' &&
          <EditKeymapModal
            {...this.props}
            index={this.state.indexToEdit}
            keymap={this.props.keymaps[this.state.indexToEdit]}
          />
        }

        <MidiListener {...this.props} />

			</section>
		);
	}
}
export default KeymapsManager;
