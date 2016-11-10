import {
  INIT_MIDI,
  RECEIVE_MIDI_EVENT,
  START_LISTENING_EVENTS,
  STOP_LISTENING_EVENTS,
  START_EXECUTE_BINDINGS,
  STOP_EXECUTE_BINDINGS
} from '../actions/midi_actions';

const midiInitialState = {
  midi: {},
  events: [],
  listeningEvents: false,
  executeBindings: true,
};

function midi(state = midiInitialState, action) {

  switch (action.type) {

    case INIT_MIDI:
      return {
        ...state,
        midi: action.midi
      };

    case START_LISTENING_EVENTS:
      return {
        ...state,
        listeningEvents: true
      };

    case STOP_LISTENING_EVENTS:
      return {
        ...state,
        listeningEvents: false
      };

    case RECEIVE_MIDI_EVENT:
      return {
        ...state,
        events: [...state.events, action.event]
      };

    case START_EXECUTE_BINDINGS:
      return {
        ...state,
        executeBindings: true
      };

    case STOP_EXECUTE_BINDINGS:
      return {
        ...state,
        executeBindings: false
      };


    default:
      return state;
  }
}

export default midi
