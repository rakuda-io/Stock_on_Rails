import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';

//components
import { Holdings } from './containers/holdings.jsx';

function App() {
  return (
    <Router>
      <Switch>
        <Route
        exact
        path="/users/:user_id/holdings"
        render={({ match }) =>
          <Holdings
          match={match}
          />
        }
        />
      </Switch>
    </Router>
  );
}

export default App;
