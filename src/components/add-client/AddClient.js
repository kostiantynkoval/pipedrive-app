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
import Avatar from '@material-ui/core/Avatar';
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
  main: {
    margin: '10px 0',
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center'
  },
  avatar: {
    margin: 10,
    width: 60,
    height: 60,
    fontFamily: 'Open Sans, sans-serif',
    color: '#0098ED',
  },
  userName: {
    fontSize: '0.775rem',
    fontWeight: 'bold',
    marginTop: 4,
    marginBottom: 4
  },
  phone: {
    fontSize: '0.775rem',
    color: 'green',
    marginBottom: 15
  },
  table: {
    borderTop: '1px solid rgba(227,227,227, 0.7)',
    padding: '10px 15px'
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    padding: '7px 0'
  },
  rowName: {
    borderBottom: 'none',
    flex: 3,
    textAlign: 'right',
    paddingRight: '8px',
    fontSize: '0.775rem'
  },
  rowData: {
    borderBottom: 'none',
    flex: 7,
    textAlign: 'left',
    paddingLeft: '8px',
    fontSize: '0.775rem',
    color: '#666'
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
    console.log('componentDidMount')
    const { getOrganizations, match, selectedClient, history } = this.props
    console.log('update props', this.props)
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
    const { pagination, updateClient, addClient, match, history} = this.props;
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
      ['7876c07667bae0482c5d9bad11c0268688fbc544']: Date.now()
    }
    if(match.path === '/clients/:id/update') {
      data.id = match.params.id
      updateClient(data, this.props.history, pagination.start, pagination.limit)
    } else {
      addClient(data, this.props.history, pagination.start, pagination.limit)
    }

  }

  render() {
    const { classes, selectedClient, isClientLoading, isDetailsActive, organizations, pagination, match } = this.props;
    console.log(pagination)
    return selectedClient !== null ? (
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
    ) : null
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
  pagination: PropTypes.object.isRequired
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
