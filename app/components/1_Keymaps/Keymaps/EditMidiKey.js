import React, { Component } from 'react';
// MATERIAL
import RaisedButton from 'material-ui/RaisedButton';


class EditMidiKey extends Component {

  constructor() {
    super();
    this.state = {
      keyID: '',
      waitingInput: false,
    };
    this.handleBindMidiKey = this.handleBindMidiKey.bind(this);
    this.handleMidiEvent   = this.handleMidiEvent.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.events !== this.props.events) {
      this.handleMidiEvent(nextProps.events);
    }
  }

  handleBindMidiKey() {
    this.props.startListeningEvents();
    this.setState({
      waitingInput: true,
      keyID: ''
    });
  }

  keyIsNotUsed(keymaps, midiEvent) {
    return keymaps.filter((keymap) => {
        return(keymap.keyID === midiEvent.key);
      }).length === 0;
  }

  handleMidiEvent(events) {

    const { keymaps } = this.props;

    const lastEvent = events[events.length-1];

    if (this.state.waitingInput && lastEvent.action === 'keyDown') {

      if (this.keyIsNotUsed(keymaps, lastEvent)) {
        this.setState({
          waitingInput: false,
          keyID: lastEvent.key
        });
        this.props.stopListeningEvents();
      }
      else {
        console.log('This key is already used.')
      }
    }


  }

  render() {

    const { keyID, waitingInput } = this.state;

    // Changing text on the binding midi button
    const labelBindingKeyButton = () => {
      if (keyID === '' && !waitingInput) return 'Bind MIDI Key';
      if (keyID !== '' && !waitingInput) return 'Key : '+ keyID;
      if (waitingInput) return 'Press the key to assign...';
    };

    return (
      <RaisedButton
        label={labelBindingKeyButton()}
        labelPosition="before"
        containerElement="label"
        onTouchTap={this.handleBindMidiKey}
        disableTouchRipple
        style={{
          marginTop: '1em'
        }}
      />
    );
  }
}
export default EditMidiKey;
