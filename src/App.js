import React, { Fragment } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard'

function App() {
  return (
    <Router>
      <Fragment>
        <Route path="/" component={Dashboard}/>
        <Route path="/clients/:id" component={Dashboard}/>
        <Route render={props => {
          const pathTest = new RegExp('/clients/.')
          if(!pathTest.test(props.location.pathname) && props.location.pathname !== '/') {
            return <Redirect to="/"/>
          }
          return null
        }}/>
      </Fragment>
    </Router>
  );
}

export default App;
