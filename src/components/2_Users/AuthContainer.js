import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as authActions from '../../redux/actions/auth_actions';
import AuthManager from './AuthManager'

const mapStateToProps = (state) => {
	return {
		base: state.firebase.base,
		isLogged: state.auth.isLogged
	}
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({...authActions}, dispatch);
};

const AuthContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(AuthManager);

export default AuthContainer

