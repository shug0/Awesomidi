// CORE
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';


import AppContainer from './components/AppContainer';

// Components
import KeymapsContainer from './components/1_Keymaps/KeymapsContainer';
import AuthConnector from './components/2_Users/AuthContainer';

const userIsLogged = (nextState, replace, callback) => {
	const state = store.getState();
	if (!state.auth.isLogged) {
		replace('login');
	}
	callback();
};

// ------  ROUTER & REDUX -----

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={AppContainer}>
				<IndexRoute component={KeymapsContainer} onEnter={userIsLogged} />
				<Route path="login" component={AuthConnector}/>
			</Route>
		</Router>
	</Provider>,
	document.getElementById('root')
);