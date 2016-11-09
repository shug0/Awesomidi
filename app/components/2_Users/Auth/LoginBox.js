// CORE
import React, { Component } from 'react';
// MATERIAL
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

// COMPONENTS

class LoginBox extends Component {

	constructor() {
		super();
		this.state = {

		};
	}

	render(){

		return (
			<div className="wrapper" style={{marginTop: '2em', maxWidth: '500px'}}>
				<Paper style={{padding: '1.5em 2em'}}>
					<h2>Login</h2>
					<RaisedButton
						label="Connect with Twitter"
						secondary={false}
						labelColor={'white'}
						backgroundColor={'#4099FF'}
						icon={
							<FontIcon
								className="fa fa-twitter"
								style={{
									color: 'white',
									fontSize: '0.9em'
								}}
							/>
						}
					  onClick={this.props.twitterAuth}
					/>

					<RaisedButton
						label="Connect with Github"
						secondary={false}
						style={{marginTop: '1em'}}
						icon={
							<FontIcon
								className="fa fa-github"
								style={{
									fontSize: '0.9em'
								}}
							/>
						}
						onClick={this.props.twitterAuth}
					/>

				</Paper>
			</div>
		)
	}
}

export default LoginBox;