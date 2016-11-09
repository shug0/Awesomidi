import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Container
import AppContainer from './components/AppContainer';
import KeymapsContainer from './components/1_Keymaps/KeymapsContainer';
import AuthConnector from './components/2_Users/AuthContainer';


export default (
  <Route path="/" component={AppContainer}>
    <IndexRoute component={KeymapsContainer} />
    <Route path="/login" component={AuthConnector}/>
  </Route>
);
