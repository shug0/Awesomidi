// CORE
import React from 'react';
import ReactDOM from 'react-dom';

// MATERIAL
import {blue500, cyan700, pinkA200, cyan500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';
// SCSS
import './index.scss';
import './components/0_Global/SCSS/base.scss';
// Components
import App from './components/App';
import Navigation from './components/0_Global/Navigation/Navigation';

injectTapEventPlugin();

// COLOR THEME
const muiTheme = getMuiTheme({
	palette: {
		primary1Color: blue500,
		primary2Color: cyan700,
		accent1Color: pinkA200,
		pickerHeaderColor: cyan500,
	},
	appBar: {
		height: 50,
	},
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

ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/" component={AppContainer}>
			<IndexRoute component={App} />
		</Route>
	</Router>,
	document.getElementById('root')
);