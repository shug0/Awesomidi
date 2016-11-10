import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import keymaps from './keymaps_reducer';
import dialog from './dialog_reducer';
import midi from './midi_reducer';

const rootReducer = combineReducers({
  keymaps,
  dialog,
  midi,
  routing
});

export default rootReducer;
