// CORE
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import routes from './routes';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

// ------  ROUTER & REDUX -----

injectTapEventPlugin();

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
	<Provider store={store}>
    <Router history={history} routes={routes} />
	</Provider>,
	document.getElementById('root')
);
