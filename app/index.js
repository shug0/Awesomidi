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

const initialState = {
  keymaps: JSON.parse(localStorage.getItem('keymaps')) || {
    keymaps: []
  }
};

const store = configureStore(initialState);
const history = syncHistoryWithStore(hashHistory, store);


store.subscribe(() => {
  localStorage.setItem('keymaps', JSON.stringify(
    store.getState().keymaps
  ));
});


ReactDOM.render(
	<Provider store={store}>
    <Router history={history} routes={routes} />
	</Provider>,
	document.getElementById('root')
);
