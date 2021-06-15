import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';

//components
import { Holdings } from './containers/holdings.jsx';

function App() {
  return (
    <Router>
      <Switch>
        {/* 保有株一覧ページ（未作成） */}
        <Route exact path="/holdings">
          <Holdings />
        </Route>
        <Route exact path="/users/:user_id/holdings" render={({ match}) =>
          <Holdings match={match} />
        }
        />
      </Switch>
    </Router>
  );
}

export default App;
