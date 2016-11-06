// CORE
import React, { Component } from 'react';
// Material
import {grey900, pinkA200} from 'material-ui/styles/colors';
import LinearProgress from 'material-ui/LinearProgress';

// Components
import KeymapsList from './Keymaps/KeymapList';

// Emoji Array
//const emojiAnimals = ['🐶','🐵','🐺','🐮','🐔','🦁','🐧','🐼','🐯','🐭','🐱','🐹','🐰','🐻','🐨','🐷','🐦','🐤','🐗'];
//const randomAnimal = () => emojiAnimals[Math.floor(Math.random()*emojiAnimals.length)];

class KeymapsContainer extends Component {

	constructor(){
		super();
		this.state = {
			keymaps: [],
			loading: true,
			appInitialised: false,
			openSnackbar: false
		};
		this.handleAddKeymap = this.handleAddKeymap.bind(this);
		this.handleRemoveKeymap = this.handleRemoveKeymap.bind(this);
		this.handleEditKeymap = this.handleEditKeymap.bind(this);
		this.handleSnackbarRequestClose = this.handleSnackbarRequestClose.bind(this);
	}

	// Firebase Syncing with keymaps state
	componentDidMount(){
		const userID = this.props.userCredentials.user.uid;
		const base = this.props.base;

		base.syncState(userID+'/keymaps', {
			context: this,
			state: 'keymaps',
			asArray: true,
			then() {
				this.setState({
					loading: false,
				});
			}
		});

	}
	// Removing Firebase if unmount
	componentWillUnmount(){
		this.props.base.removeBinding(this.ref);
	}

	handleAddKeymap(newKeymap){
		this.setState({
			keymaps: this.state.keymaps.concat([newKeymap])
		});
	}
	
	handleRemoveKeymap(index){
		let newKeymaps = this.state.keymaps;
		newKeymaps.splice(index, 1);
		this.setState({
			keymaps: newKeymaps
		})
	}

	handleEditKeymap(index, newKeymap) {
		let newKeymaps = this.state.keymaps;
		newKeymaps[index] = newKeymap;
		this.setState({
			keymaps: newKeymaps
		})
	}

	handleSnackbarRequestClose() {
		this.setState({
			openSnackbar: false
		});
	}

	componentWillUpdate(nextProps, nextState) {
		if (
			nextState.keymaps !== this.state.keymaps &&
			this.state.openSnackbar === false &&
			this.state.appInitialised === true
		) {
			this.setState({
				openSnackbar: true
			});
		}
	}

	componentDidUpdate(nextProps, nextState) {
		if (nextState.keymaps !== this.state.keymaps) {
			this.setState({
				appInitialised: true
			});
		}
	}

	render() {
		return (

			<section className='wrapper' style={{marginTop: '2em'}}>
				<h2 style={{color: grey900}}>Keymaps List</h2>

				{ this.state.loading &&
					<LinearProgress
						mode="indeterminate"
						style={{
							position: 'absolute',
							top: '64px',
							left: '0'
						}}
						color={pinkA200}
					/>
				}

				{ !this.state.loading &&
					<KeymapsList
						keymaps={this.state.keymaps}
						removeKeymap={this.handleRemoveKeymap}
						addKeymap={this.handleAddKeymap}
						editKeymap={this.handleEditKeymap}
					/>
				}
			</section>
		);
	}
}
export default KeymapsContainer;
