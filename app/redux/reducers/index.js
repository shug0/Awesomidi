import { reducer as formReducer } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import keymaps from './keymaps_reducer';
import dialog from './dialog_reducer';
import midi from './midi_reducer';

const rootReducer = combineReducers({
  keymaps,
  dialog,
  midi,
  routing,
  formReducer
});

export default rootReducer;
