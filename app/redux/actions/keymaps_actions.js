
// ------------------ NEW_AUTH------------------

export const ADD_KEYMAP = 'ADD_KEYMAP';
export const addKeymap = (keymap) => ({
	type: ADD_KEYMAP,
	keymap: keymap
});

export const REMOVE_KEYMAP = 'REMOVE_KEYMAP';
export const removeKeymap = (index) => ({
  type: REMOVE_KEYMAP,
  index: index
});

export const EDIT_KEYMAP = 'EDIT_KEYMAP';
export const editKeymap = (index, newKeymap) => ({
  type: EDIT_KEYMAP,
  index: index,
  newKeymap: newKeymap
});




