import {
	NEW_AUTH
} from '../actions/keymaps_actions';

const authState = {
	userCredentials: false
};

function auth(state = authState, action) {

	switch (action.type) {

		case NEW_AUTH:
			return {
				...state,
				userCredentials: action.userCredentials
			};

		default:
			return state;
	}
}

export default auth
