import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as keymapsActions from '../../redux/actions/keymaps_actions';
import * as dialogActions from '../../redux/actions/dialog_actions';
import * as midiActions from '../../redux/actions/midi_actions';
import KeymapsManager from './KeymapsManager'

const mapStateToProps = (state) => {
	return {
		keymaps: state.keymaps.keymaps,
    dialog: state.dialog,
    midi: state.midi.midi,
    events: state.midi.events,
    listeningEvents: state.midi.listeningEvents
	}
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
    ...keymapsActions, ...dialogActions, ...midiActions
	}, dispatch);
};

const KeymapsContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(KeymapsManager);

export default KeymapsContainer

