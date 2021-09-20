import React, { Component } from 'react';
import './App.css';
import Home from './containers/Home';
import Auth from './containers/Auth';
import Login from './containers/Login';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';

//components
// import { HoldingsList } from './containers/HoldingsList.jsx';
// import { PieCharts } from './containers/PieChart.jsx';
import { Dashboard } from './containers/Dashboard.jsx';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route
        exact
        path="/users/:user_id/holdings"
        render= {({match}) =>
          <Dashboard match={match}/>
        }
        />
        <Auth>
          <Route exact path="/" component={Home} />
        </Auth>
      </Switch>
    </Router>
  );
}

export default App;
