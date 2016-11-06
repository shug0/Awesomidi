import {
	NEW_AUTH
} from '../actions/auth_actions';

const authState = {
	userCredentials: {},
	isLogged: false
};

function auth(state = authState, action) {

	switch (action.type) {

		case NEW_AUTH:
			return {
				...state,
				userCredentials: action.userCredentials,
				isLogged: true
			};

		default:
			return state;
	}
}

export default auth