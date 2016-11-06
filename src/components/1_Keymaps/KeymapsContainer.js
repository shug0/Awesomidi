import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as authActions from '../../redux/actions/auth_actions';
import KeymapsManager from './KeymapsManager'

const mapStateToProps = (state) => {
	return {
		base: state.firebase.base,
		isLogged: state.auth.isLogged,
		userCredentials: state.auth.userCredentials
	}
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({...authActions}, dispatch);
};

const KeymapsContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(KeymapsManager);

export default KeymapsContainer

