import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import Header from '../header/Header'
import Loader from '../loader/Loader'
import ClientsList from '../clients-list/ClientsList'
import {getClients, searchClients} from '../../store/actions'

const styles = {
  container: {
    marginTop: 64,
    padding: '0 15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    marginTop: 15,
    fontWeight: 'bold'
  },
  wrapper: {
    padding: '7px 15px 0'
  },
  link: {
    marginTop: 15,
    textDecoration: 'none'
  }
};

class Dashboard extends Component {

  componentDidMount() {
    const { getClients, pagination: { start, limit } } = this.props
    getClients(start, limit)
  }

  onSearchClients = (term) => {
    const { getClients, searchClients, pagination: { start, limit } } = this.props
    console.log('onSearchClients', this.props, term)
    if(term === '') {
      getClients(start, limit)
    } else {
      searchClients(term, start, limit)
    }
  }

  render() {
    const { clientsList, isLoading, classes } = this.props
    return (
      <Fragment>
        <Header searchClients={this.onSearchClients} />
        <div className={classes.container}>
          <div className={classes.title}>People's List</div>
          <Link to="/clients/add" className={classes.link}>
            <Button variant="outlined" color="primary">
              New Client
            </Button>
          </Link>

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
  isLoading: state.clients.isLoading,
  pagination: state.clients.pagination,
})

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  clientsList: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  pagination: PropTypes.object.isRequired,
}

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    dispatch => ({
      getClients: (start, limit) => dispatch(getClients(start, limit)),
      searchClients: (term, start, limit) => dispatch(searchClients(term, start, limit))
    })
  )
)(Dashboard)