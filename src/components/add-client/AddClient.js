import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux'
import {
  getClientDetails,
  openDetailsWindow,
  closeDetailsWindow,
  getOrganizations,
  addClient,
  updateClient
} from '../../store/actions'
import { withStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Times from '../times/Times'

const styles = theme => ({
  paper: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    width: 360,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
  },
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  root: {
    background: 'rgb(237,237,238)',
    borderBottom: '1px solid rgba(227,227,227, 0.9)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8
  },
  title: {
    fontSize: '0.875rem',
    fontWeight: 'bold',
    fontFamily: 'Open Sans, sans-serif',
  },
  action: {
    marginTop: 0
  },
  content: {
    padding: '0 15px',
    marginBottom: '30px',
    display: 'flex',
    flexDirection: 'column',
  },
  actions: {
    background: 'rgb(237,237,238)',
    borderTop: '1px solid rgba(227,227,227, 0.9)',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    textTransform: 'none',
    padding: '6px 24px',
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: 'bold'
  }
});

class AddClient extends Component {

  state = {
    name: '',
    email: '',
    phone: '',
    org_id: '',
    error: ''
  }

  componentDidMount() {
    const { getOrganizations, match, selectedClient, history } = this.props

    // if active route - update and no selected client in store - redirect to '/' or fill state with client data
    if(match.path === '/clients/:id/update') {
      if(!selectedClient) {
        history.push('/')
      } else {
        this.setState({
          name: selectedClient.name || '',
          email: selectedClient.email[0].value || '',
          phone: selectedClient.phone[0].value || '',
          org_id: selectedClient.org_id ? selectedClient.org_id.value : ''
        })
      }
    }
    // get full organizations list to use in form as select options
    getOrganizations()
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
    if(event.target.name === 'name') {
      this.setState({error: ''})
    }
  }

  handleClose = () => {
    this.props.closeDetailsWindow()
    this.props.history.push('/')
  }

  handleSubmit = event => {
    const { pagination, updateClient, addClient, match } = this.props;
    const { name, email, org_id, phone} = this.state;
    event.preventDefault()
    if(name === '') {
      this.setState({error: 'Name is required'})
      return
    }
    const data = {
      name,
      email,
      org_id,
      phone,
      // client's odrer index: timestamp on client creation
      ['7876c07667bae0482c5d9bad11c0268688fbc544']: Date.now() // eslint-disable-line no-useless-computed-key
    }
    // adding client action or updating exist client
    if(match.path === '/clients/:id/update') {
      data.id = match.params.id
      updateClient(data, this.props.history, pagination.start, pagination.limit)
    } else {
      addClient(data, this.props.history, pagination.start, pagination.limit)
    }

  }

  render() {
    const { classes, isDetailsActive, organizations, match } = this.props;
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={isDetailsActive}
        onClose={this.handleClose}
        className={classes.modal}
      >
        <Card classes={{root: classes.paper}}>
          <CardHeader
            classes={{root: classes.root, title: classes.title, action: classes.action}}
            action={
              <IconButton onClick={this.handleClose}>
                <Times />
              </IconButton>
            }
            title={ match.path === '/clients/:id/update' ? 'Update Person' : 'Add New Person' }
          />
          <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
          <CardContent className={classes.content}>

            <FormControl
              margin="normal"
              className={classes.formControl}
              error={this.state.error !== ''}
              aria-describedby="standard-name-text">
              <InputLabel htmlFor="standard-name">Name</InputLabel>
              <Input id="standard-name" name="name" value={this.state.name} onChange={this.handleChange} />
              { this.state.error !== '' && <FormHelperText id="standard-name-text">{this.state.error}</FormHelperText> }
            </FormControl>

            <TextField
              id="standard-email"
              label="Email"
              name="email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange}
              margin="normal"
            />
            <TextField
              id="standard-phone"
              label="Phone"
              name="phone"
              className={classes.textField}
              value={this.state.phone}
              onChange={this.handleChange}
              margin="normal"
            />
            <TextField
              select
              SelectProps={{
                style: {
                  display: 'block',
                  width: '100%',
                  native: true,
                }
              }}
              id="standard-org"
              label="Organization"
              name="org_id"
              className={classes.textField}
              value={this.state['org_id']}
              onChange={this.handleChange}
              margin="normal"
            >
              {
                organizations.map(item => (
                  <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                ))
              }
            </TextField>
          </CardContent>
          <CardActions className={classes.actions}>
            <Button type="submit" variant="outlined" className={classes.button}>
              { match.path === '/clients/:id/update' ? 'Update' : 'Add' }
            </Button>
          </CardActions>
          </form>
        </Card>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  isDetailsActive: state.clients.isDetailsActive,
  isClientLoading: state.clients.isClientLoading,
  organizations: state.clients.organizations,
  selectedClient: state.clients.selectedClient,
  pagination: state.clients.pagination
})

AddClient.propTypes = {
  classes: PropTypes.object.isRequired,
  isDetailsActive: PropTypes.bool.isRequired,
  isClientLoading: PropTypes.bool.isRequired,
  organizations: PropTypes.array,
  selectedClient: PropTypes.object,
  pagination: PropTypes.object.isRequired,
  getOrganizations: PropTypes.func.isRequired,
  addClient: PropTypes.func.isRequired,
  updateClient: PropTypes.func.isRequired,
  getClientDetails: PropTypes.func.isRequired,
  openDetailsWindow: PropTypes.func.isRequired,
  closeDetailsWindow: PropTypes.func.isRequired
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    dispatch => ({
      getOrganizations: () => dispatch(getOrganizations()),
      addClient: (data, history, start, limit) => dispatch(addClient(data, history, start, limit)),
      updateClient: (data, history, start, limit) => dispatch(updateClient(data, history, start, limit)),
      getClientDetails: id => dispatch(getClientDetails(id)),
      openDetailsWindow: () => dispatch(openDetailsWindow()),
      closeDetailsWindow: () => dispatch(closeDetailsWindow())
    })
  )
)(AddClient);
