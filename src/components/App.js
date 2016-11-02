// CORE
import React, { Component } from 'react';
// Components
import KeymapsContainer from './1_Keymaps/KeymapContainer';
// SCSS
import './App.scss';

class App extends Component {

	render() {

		return (
			<main className='App'>
				<KeymapsContainer />
			</main>
		);
	}
}

export default App;
