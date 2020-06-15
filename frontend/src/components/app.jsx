import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';

import SplashContainer from './splash/splash_container';
import ModalContainer from './modal/modal_container';

const App = () => (
  <div>
    <ModalContainer />
    <Switch>
      <Route exact path="/" component={SplashContainer} />
    </Switch>
  </div>
);

export default App;