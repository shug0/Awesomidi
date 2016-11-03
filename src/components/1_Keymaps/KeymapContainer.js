// CORE
import React, { Component } from 'react';
// SCSS
import './KeymapContainer.scss';
// LIBS
const Rebase = require('re-base');
// Material
import {grey900} from 'material-ui/styles/colors';
import Snackbar from 'material-ui/Snackbar';
// Components
import KeymapList from './Keymaps/KeymapList';

// Setuping Firebase
const base = Rebase.createClass({
	apiKey: "AIzaSyDbW6kUyevj7tEYQ2c6p-s7fwuz0xxx8ps",
	authDomain: "awesomidi.firebaseapp.com",
	databaseURL: "https://awesomidi.firebaseio.com",
	storageBucket: "awesomidi.appspot.com",
	messagingSenderId: "181061673796"
});

// Emoji Array
const emojiAnimals = ['🐶','🐵','🐺','🐮','🐔','🦁','🐧','🐼','🐯','🐭','🐱','🐹','🐰','🐻','🐨','🐷','🐦','🐤','🐗'];
const randomAnimal = () => emojiAnimals[Math.floor(Math.random()*emojiAnimals.length)];

class KeymapContainer extends Component {

	constructor(){
		super();
		this.state = {
			keymaps: [],
			loading: true,
			openSnackbar: false
		};
		this.handleAddKeymap = this.handleAddKeymap.bind(this);
		this.handleRemoveKeymap = this.handleRemoveKeymap.bind(this);
		this.handleEditKeymap = this.handleEditKeymap.bind(this);
		this.handleSnackbarRequestClose = this.handleSnackbarRequestClose.bind(this);
	}

	// Firebase Syncing with keymaps state
	componentDidMount(){
		base.syncState('keymaps', {
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
		base.removeBinding(this.ref);
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
		console.log(this.state.keymaps);
		if (
			nextState.keymaps !== this.state.keymaps &&
			this.state.openSnackbar === false
		) {
			this.setState({
				openSnackbar: true
			});
		}
	}

	render() {
		return (
			<section className='Keymaps wrapper'>

				<h2 style={{color: grey900}}>Keymaps List</h2>

				{ this.state.loading &&
					<h3> LOADING... </h3>
				}

				{ !this.state.loading &&
					<KeymapList
						keymaps={this.state.keymaps}
						removeKeymap={this.handleRemoveKeymap}
						addKeymap={this.handleAddKeymap}
						editKeymap={this.handleEditKeymap}
					/>
				}

				{ this.state.openSnackbar &&
					<Snackbar
						style={{
							left: 'inherit',
							top: '1.5em',
							right: '1.5em',
							transform: 'translate()'
						}}
						bodyStyle={{
							backgroundColor: 'white',
							width: 'auto',
							boxShadow: '1px 2px 10px -1px rgba(0,0,0,0.1)'
						}}
						contentStyle={{
							color: grey900
						}}
						open={this.state.openSnackbar}
						message={"Un utilisateur a fait une modification " + randomAnimal() + '  !'}
						autoHideDuration={2000}
						onRequestClose={this.handleSnackbarRequestClose}
					/>
				}
			</section>
		);
	}
}
export default KeymapContainer;
