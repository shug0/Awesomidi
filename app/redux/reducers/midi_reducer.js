import {
  INIT_MIDI
} from '../actions/midi_actions';

const midiInitialState = {
  name: ''
};

function midi(state = midiInitialState, action) {

  switch (action.type) {

    case INIT_MIDI:
      return {
        ...state,
        name: action.name
      };

    default:
      return state;
  }
}

export default midi
