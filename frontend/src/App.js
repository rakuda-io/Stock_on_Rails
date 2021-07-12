import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';

//components
// import { HoldingsList } from './containers/HoldingsList.jsx';
// import { PieCharts } from './containers/PieChart.jsx';
import { Dashboard } from './containers/Dashboard.jsx';

function App() {
  return (
    <Router>
      <Switch>
        <Route
        exact
        path="/users/:user_id/holdings"
        render= {({match}) =>
          <Dashboard match={match}/>
        }
        />
      </Switch>
    </Router>
  );
}

export default App;
