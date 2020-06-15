import React from 'react';
// import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';

import Splash from './splash/splash';
// import LoginFormContainer from './session/login_form_container';
// import SignupFormContainer from './session/signup_form_container';
// import ProfileContainer from './profile/profile_container';

const App = () => (
  <div>
    {/* <h3>Hello</h3> */}
    <Switch>
      <Route exact path="/" component={Splash} />
      {/* <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />

      <ProtectedRoute exact path="/profile" component={ProfileContainer} /> */}
    </Switch>
  </div>
);

export default App;