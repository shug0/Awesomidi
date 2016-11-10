import {
  SHOW_DIALOG,
  HIDE_DIALOG,
} from '../actions/dialog_actions';

const dialogInitialState = {
  dialogType: {}
};

function dialog(state = dialogInitialState, action) {
  switch (action.type) {
    case 'SHOW_DIALOG':
      return {
        dialogType: action.dialogType
      };

    case 'HIDE_DIALOG':
      return dialogInitialState;

    default:
      return state
  }
}
export default dialog;
