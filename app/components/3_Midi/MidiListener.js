// CORE
import React, { Component } from 'react';

class MidiListener extends Component {

  componentDidMount() {

    navigator.requestMIDIAccess()
      .then(midi => {
        this.props.initMidi(midi);
        const input = [...midi.inputs][0][1];
        input.addEventListener('midimessage', onMidiEvent)
      })
      .catch((err) => { console.error('Midi connexion error', err) } );

    const onMidiEvent = event => {
      if (this.props.listeningEvents) {
        this.props.receiveMidiEvent(event)
      }
    }

  }

  render() {

    return (
      <div></div>
    );
  }
}
export default MidiListener;
