import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';

import SplashContainer from './splash/splash_container';
import ModalContainer from './modal/modal_container';
import ProfileContainer from './profile/profile_container';
import NavbarContainer from './splash/navbar_container';

const App = () => (
  <div>
    <ModalContainer />
    <NavbarContainer />
    <Switch>
      <Route exact path="/" component={SplashContainer} />
      <Route exact path="/users/:userId" component={ProfileContainer} />
    </Switch>
  </div>
);

export default App;