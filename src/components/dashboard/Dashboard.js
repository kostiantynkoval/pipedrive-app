import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withStyles } from '@material-ui/core/styles'
import Header from '../header/Header'
import Loader from '../loader/Loader'
import ClientsList from '../clients-list/ClientsList'
import {getClients} from '../../store/actions'


const styles = {
  container: {
    padding: '0 15px',
    borderBottom: '2px solid rgba(227,227,227, 0.7)',
  },
  wrapper: {
    padding: '7px 15px 0'
  },
};

class Dashboard extends Component {

  componentDidMount() {
    this.props.getClients()
  }

  render() {
    const { clientsList, isLoading, classes } = this.props
    return (
      <Fragment>
        <Header/>
        <div className={classes.container}>
          <h3>People's List</h3>
        </div>

        <div className={classes.wrapper}>
          {
            isLoading ? <Loader/> : <ClientsList clients={clientsList}/>
          }
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  clientsList: state.clients.list,
  isLoading: state.clients.isLoading
})

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    dispatch => ({
      getClients: () => dispatch(getClients())
    })
  )
)(Dashboard)