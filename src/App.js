import React, { Fragment } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard'
import ClientDetails from './components/client-details/ClientDetails'

function App() {
  return (
    <Router>
      <Fragment>
        <Route path="/" component={Dashboard}/>
        <Route path="/clients/:id" component={ClientDetails}/>
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
