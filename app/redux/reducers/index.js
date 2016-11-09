import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import keymaps from './keymaps_reducer';
import dialog from './dialog_reducer';

const rootReducer = combineReducers({
  keymaps,
  dialog,
  routing
});

export default rootReducer;
