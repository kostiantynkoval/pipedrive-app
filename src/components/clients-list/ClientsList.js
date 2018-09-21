import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {getClients} from '../../store/actions'
import ClientItem from '../client-item/ClientItem'
import List from '@material-ui/core/List';

class ClientsList extends Component {

  render() {
    const { clients } =this.props
    return (
      <List>
        {
          clients.map(client => <ClientItem key={client.id} {...client} />)
        }
      </List>
    );
  }
}

function mapStateToProps(state) {
  return {
    clientsList: state.clients.list,
    isLoading: state.clients.isLoading
  }
}

ClientsList.propTypes = {
  classes: PropTypes.object,
}

export default connect(
  mapStateToProps,
  dispatch => ({
    getClients: () => dispatch(getClients())
  })
)(ClientsList);
