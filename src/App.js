import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import PrescribeDrug from './components/PrescibeDrug';
import Admin from './components/admin/Home';
import Header from "./components/Header";
import Report from "./components/admin/report/report";
import Create from "./components/admin/Create";

function App() {
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route path="/" component={PrescribeDrug} exact />
        <Route path="/admin" component={Admin} />
        <Route path="/report" component={Report} />
        <Route path="/create/:id?" component={Create} />
      </Switch>
    </React.Fragment>
  );
}

export default App;