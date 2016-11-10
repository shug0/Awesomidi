// CORE
import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { green200, red500 } from 'material-ui/styles/colors';

const Navigation = (props) => {

  const statusColor = props.executeBindings ? green200 : red500;
  const statusText = props.executeBindings ? 'Bindings activated' : 'Bindings desactivated';

	return (
		<AppBar
			title={props.title}
			titleStyle={{fontWeight: 300}}
      iconElementRight={
        <FlatButton
          icon={<div style={{
            height: '10px',
            width: '10px',
            background: statusColor,
            display: 'inline-block',
            borderRadius: '50%'
          }}/>}
          label={statusText}
          style={{
            fontSize: '0.7em'
          }}
          disableTouchRipple
          onTouchTap={
            props.executeBindings ?
              props.stopExecuteBindings : props.startExecuteBindings
          }
        />
      }
    />
	);
};

export default Navigation;
