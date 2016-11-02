// CORE
import React, { Component } from 'react';
// SCSS
import './KeymapContainer.scss';
// LIBS
const Rebase = require('re-base');

// Components
import ShortcutsList from './Keymaps/KeymapList';
import AddKeymaps from './Keymaps/AddKeymaps';

const base = Rebase.createClass({
	apiKey: "AIzaSyDbW6kUyevj7tEYQ2c6p-s7fwuz0xxx8ps",
	authDomain: "awesomidi.firebaseapp.com",
	databaseURL: "https://awesomidi.firebaseio.com",
	storageBucket: "awesomidi.appspot.com",
	messagingSenderId: "181061673796"
});

class KeymapContainer extends Component {

	constructor(){
		super();
		this.state = {
			keymaps: [],
			loading: true
		};
		this.handleAddKeymap = this.handleAddKeymap.bind(this);
		this.handleRemoveKeymap = this.handleRemoveKeymap.bind(this);
	}

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

	componentWillUnmount(){
		base.removeBinding(this.ref);
	}
	
	handleAddKeymap(newKeymap){
		console.log(newKeymap);
		this.setState({
			keymaps: this.state.keymaps.concat([newKeymap])
		});
	}
	
	handleRemoveKeymap(index){
		var newKeymaps = this.state.keymaps;
		newKeymaps.splice(index, 1);
		this.setState({
			keymaps: newKeymaps
		})
	}

	render() {
		return (
			<section className='Keymaps wrapper'>
				<h2>Keymaps List</h2>
				{ this.state.loading &&
					<h3> LOADING... </h3> }
				{ !this.state.loading &&
					<ShortcutsList
						keymaps={this.state.keymaps}
						removeKeymap={this.handleRemoveKeymap}
					/>
				}

				<AddKeymaps
					addKeymap={this.handleAddKeymap}
				/>

			</section>
		);
	}
}

export default KeymapContainer;
