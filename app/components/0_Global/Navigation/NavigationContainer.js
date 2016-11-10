import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as midiActions from '../../../redux/actions/midi_actions';
import Navigation from './Navigation'

const mapStateToProps = (state) => {
  return {
    executeBindings: state.midi.executeBindings
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({...midiActions }, dispatch);
};

const KeymapsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);

export default KeymapsContainer

