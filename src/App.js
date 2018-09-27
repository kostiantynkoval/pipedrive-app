import React, { Fragment } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard'
import ClientDetails from './components/client-details/ClientDetails'
import AddClient from './components/add-client/AddClient'

function App() {
  return (
    <Router>
      <Fragment>
        <Route path="/" component={Dashboard}/>
        <Route exact path="/clients/:id" render={props => {
          if(props.match.params.id === 'add') {
            return <AddClient {...props}/>
          } else {
            return <ClientDetails {...props}/>
          }

        }}/>
        <Route path="/clients/:id/update" component={AddClient}/>
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
