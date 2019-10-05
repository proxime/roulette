import React, { useEffect } from 'react';
import './App.css';
import 'simplebar/dist/simplebar.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Routes from './route/Routes';
import Welcome from './components/fullscreen/Welcome';
// import PrivateRoute from './route/PrivateRoute';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  }, []);

  return (
    <Provider store={store}>
      <Router >
        <Switch>
          <Route exact path="/welcome" component={Welcome} />
          <Route component={Routes} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
