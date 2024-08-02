/** @format */

import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import EmployeeIndex from './page/karyawan';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/karyawan' component={EmployeeIndex} />
      </Switch>
    </Router>
  );
}

export default App;
