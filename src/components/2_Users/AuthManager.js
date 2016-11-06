// CORE
import React, { Component } from 'react';
var { browserHistory } = require('react-router');
// Components
import LoginBox from './Auth/LoginBox';

class AuthManager extends Component {

	constructor(){
		super();
		this.handleTwitterAuth = this.handleTwitterAuth.bind(this);
	}

	componentWillUpdate(nextProps, nextState) {
		if (nextProps.isLogged === true) {
			browserHistory.push('/');
		}
	}

	handleTwitterAuth() {
		let authHandler = function(error, user) {
			this.props.newUserAuth(user);
		};
		this.props.base.authWithOAuthPopup('twitter', authHandler.bind(this));
	}

	render() {
		return (
			<LoginBox
				twitterAuth={this.handleTwitterAuth}
			/>
		);
	}
}
export default AuthManager;
