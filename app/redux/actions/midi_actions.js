const {ipcRenderer} = require('electron')

export const INIT_MIDI = 'INIT_MIDI';
export const initMidi = (midi) => ({
  type: INIT_MIDI,
  midi: midi
});

export const STOP_LISTENING_EVENTS = 'STOP_LISTENING_EVENTS';
export const stopListeningEvents = () => ({
  type: STOP_LISTENING_EVENTS,
});

export const START_LISTENING_EVENTS = 'START_LISTENING_EVENTS';
export const startListeningEvents = () => ({
  type: START_LISTENING_EVENTS,
});

export const RECEIVE_MIDI_EVENT = 'RECEIVE_MIDI_EVENT';
export const receiveMidiEvent = (event) => {
  const eventFormated = {
    key: event.data[1],
    action: event.data[0] === 144 ? 'keyDown' : event.data[0] === 128 ? 'keyUp' : 'other',
    velocity: event.data[2],
    unformated: event
  };
  return {
    type: RECEIVE_MIDI_EVENT,
    event: eventFormated
  }
};

export const RECEIVE_MIDI_EVENT_TO_EXECUTE = 'RECEIVE_MIDI_EVENT_TO_EXECUTE';
export const receiveMidiEventToExecute = (event, keymaps) => {
  const eventFormated = {
    key: event.data[1],
    action: event.data[0] === 144 ? 'keyDown' : event.data[0] === 128 ? 'keyUp' : 'other',
    velocity: event.data[2]
  };

  const bind = (keymaps.find((keymap) => eventFormated.key === keymap.keyID));

  if (bind && eventFormated.action === 'keyUp') {
    ipcRenderer.send('commandToExecute', bind);
  }

  return {
    type: RECEIVE_MIDI_EVENT
  }
};



export const START_EXECUTE_BINDINGS = 'START_EXECUTE_BINDINGS';
export const startExecuteBindings = () => ({
  type: START_EXECUTE_BINDINGS,
});

export const STOP_EXECUTE_BINDINGS = 'STOP_EXECUTE_BINDINGS';
export const stopExecuteBindings = () => ({
  type: STOP_EXECUTE_BINDINGS,
});

