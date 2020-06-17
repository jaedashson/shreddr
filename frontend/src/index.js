import React from 'react';
import ReactDOM from 'react-dom';
// import axios from 'axios';
import Root from './components/root.jsx';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import 'normalize.css';

import { setAuthToken } from './util/session_api_util';
import { logout } from './actions/session_actions';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faUserCircle, faUpload
} from '@fortawesome/free-solid-svg-icons';
import {
  faUser, 
} from '@fortawesome/free-regular-svg-icons';

library.add(fab, faUser, faUserCircle, faUpload);



document.addEventListener('DOMContentLoaded', () => {
  let store;

  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);

    const decodedUser = jwt_decode(localStorage.jwtToken);
    const preloadedState = { session: { isAuthenticated: true, user: decodedUser } };

    store = configureStore(preloadedState);

    const currentTime = Date.now() / 1000;

    if (decodedUser.exp < currentTime) {
      store.dispatch(logout());
    }
  } else {
    store = configureStore({});
  }
  window.getState = store.getState;
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
});

// ReactDOM.render(<App />, document.getElementById('root'));
// window.axios = axios;