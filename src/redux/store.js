import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';

import auth from './reducers/auth_reducer';
import firebase from './reducers/firebase_reducer';

const reducers = combineReducers({
	auth,
	firebase
});

let store = createStore(
	reducers,
	compose(
		applyMiddleware(ReduxThunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : v => v
	)
);

export default store;



