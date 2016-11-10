export const SHOW_DIALOG = 'SHOW_DIALOG';
export const showDialog = (dialogType) => ({
  type: SHOW_DIALOG,
  dialogType: dialogType
});

export const HIDE_DIALOG = 'HIDE_DIALOG';
export const closeDialog = () => ({
  type: HIDE_DIALOG,
});
