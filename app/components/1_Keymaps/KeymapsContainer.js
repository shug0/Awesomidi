import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as keymapsActions from '../../redux/actions/keymaps_actions';
import * as dialogActions from '../../redux/actions/dialog_actions';
import KeymapsManager from './KeymapsManager'

const mapStateToProps = (state) => {
	return {
		keymaps: state.keymaps.keymaps,
    dialog: state.dialog
	}
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({...keymapsActions, ...dialogActions}, dispatch);
};

const KeymapsContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(KeymapsManager);

export default KeymapsContainer

