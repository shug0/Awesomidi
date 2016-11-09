import {
  ADD_KEYMAP,
  REMOVE_KEYMAP,
  EDIT_KEYMAP
} from '../actions/keymaps_actions';

const keymapsState = {
  keymaps: []
};

function keymaps(state = keymapsState, action) {

  switch (action.type) {

    case ADD_KEYMAP:
      return {
        ...state,
        keymaps: [...state.keymaps, action.keymap]
      };

    case REMOVE_KEYMAP:
      return {
        ...state,
        keymaps: state.keymaps.filter((keymap, index) => action.index !== index)
      };

    case EDIT_KEYMAP:
      return {
        ...state,
        keymaps: state.keymaps.map((keymap, index) =>
          index === action.index ? action.newKeymap : keymap
        )
      };

    default:
      return state;
  }
}

export default keymaps
