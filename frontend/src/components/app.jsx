import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';

import SplashContainer from './splash/splash_container';
import ModalContainer from './modal/modal_container';
import ProfileContainer from './profile/profile_container';
import NavbarContainer from './splash/navbar_container';
import TrainingContainer from './training/training_container';
import GymFinderContainer from './gym_finder/gym_finder_container';

const App = () => (
  <div>
    <ModalContainer />
    <NavbarContainer />
    <Switch>
      <Route exact path="/" component={SplashContainer} />
      <ProtectedRoute exact path="/users/:userId" component={ProfileContainer} />
      <Route exact path="/training" component={TrainingContainer} />
      <Route exact path="/gym-finder" component={GymFinderContainer} />
    </Switch>
  </div>
);

export default App;