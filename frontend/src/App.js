import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';

//components
import { Holdings } from './containers/holdings.jsx';

function App() {
  return (
    <Router>
      <Switch>
        // 保有株一覧ページ（未作成）
        <Route exact path="/holdings">
          <Holdings />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
