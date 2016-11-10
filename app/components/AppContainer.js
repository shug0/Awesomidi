import React from 'react';
// MATERIAL
import {blue500, cyan700, pinkA200, cyan500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// COMPONENT
import Navigation from '../components/0_Global/Navigation/NavigationContainer';

// CSS
import './0_Global/CSS/reset.css';
import './0_Global/CSS/base.css';

// ----- COLOR THEME -----
const muiTheme = getMuiTheme({
	palette: {
		primary1Color: blue500,
		primary2Color: cyan700,
		accent1Color: pinkA200,
		pickerHeaderColor: cyan500,
	}
});

const AppContainer = ({ children, location }) => (
	<MuiThemeProvider muiTheme={muiTheme}>
		<div>
			<Navigation title="Awesomidi"/>
			{React.cloneElement(children, {
				key: location.pathname
			})}
		</div>
	</MuiThemeProvider>
);

export default AppContainer;
