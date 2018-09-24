import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { getClientDetails, openDetailsWindow, closeDetailsWindow } from '../../store/actions'
import { withStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Times from '../times/Times'
import Loader from '../loader/Loader'

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
    marginBottom: '30px'
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
  },
  link: {
    textDecoration: 'none'
  }
});

class ClientDetails extends React.Component {

  componentDidMount() {
    if(this.props.selectedClient !== null && this.props.selectedClient.id.toString() === this.props.match.params.id) {
      this.props.openDetailsWindow()
    } else {
      this.props.getClientDetails(this.props.match.params.id)
    }
  }

  getSnapshotBeforeUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      return this.props.match.params.id
    }
    return null
  }

  componentDidUpdate(prevProps, s, snapshot) {
    if (snapshot) {
      this.props.getClientDetails(snapshot)
    }
  }

  handleClose = () => {
    this.props.closeDetailsWindow()
    this.props.history.push('/')
  };

  render() {
    const { classes, selectedClient, isClientLoading, match, isDetailsActive } = this.props;
    if(isClientLoading) {
      return <Loader/>
    }
    return selectedClient !== null ? (
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={isDetailsActive}
          onClose={this.handleClose}
          className={classes.modal}
        >
          <Card className={classes.paper}>
            <CardHeader
              classes={{root: classes.root, title: classes.title, action: classes.action}}
              action={
                <IconButton onClick={this.handleClose}>
                  <Times />
                </IconButton>
              }
              title="Person Information"
            />
            <CardContent className={classes.content}>
              <div className={classes.main}>
                {
                  selectedClient.picture_id === null ?
                    <Avatar className={classes.avatar}>{selectedClient.first_name.charAt(0)}{selectedClient.last_name.charAt(0)}</Avatar> :
                    <Avatar className={classes.avatar}>!!</Avatar>
                }
                <div className={classes.userName}>{selectedClient.name}</div>
                <div className={classes.phone}>{selectedClient.phone[0].value}</div>
              </div>
              <div className={classes.table}>
                <div>
                  <div className={classes.row}>
                    <div className={classes.rowName}>Email</div>
                    <div className={classes.rowData}>{selectedClient.email[0].value}</div>
                  </div>
                  <div className={classes.row}>
                    <div className={classes.rowName}>Organization</div>
                    <div className={classes.rowData}>{selectedClient.org_id.name}</div>
                  </div>
                  <div className={classes.row}>
                    <div className={classes.rowName}>Assistant</div>
                    <div className={classes.rowData}>{selectedClient['0fb2250701a47d2f9a7b76a5607627c65db9f340']}</div>
                  </div>
                  <div className={classes.row}>
                    <div className={classes.rowName}>Groups</div>
                    <div className={classes.rowData}>{selectedClient['eb51ff0d3aa890221a3208fc2d7a5d9a290b7ca8']}</div>
                  </div>
                  <div className={classes.row}>
                    <div className={classes.rowName}>Location</div>
                    <div className={classes.rowData}>{selectedClient.org_id.address}</div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardActions className={classes.actions}>
              <Link  className={classes.link} to={`/clients/${match.params.id}/update`}>
                <Button variant="outlined" color="primary" className={classes.button} onClick={this.handleClose} >
                  Update
                </Button>
              </Link>
              <Button variant="outlined" color="secondary" className={classes.button} onClick={this.handleClose} >
                Delete
              </Button>
              <Button variant="outlined" className={classes.button} onClick={this.handleClose} >
                Back
              </Button>
            </CardActions>
          </Card>
        </Modal>
    ) : null
  }
}

const mapStateToProps = state => ({
  selectedClient: state.clients.selectedClient,
  isDetailsActive: state.clients.isDetailsActive,
  isClientLoading: state.clients.isClientLoading
})

ClientDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedClient: PropTypes.object,
  isDetailsActive: PropTypes.bool.isRequired,
  isClientLoading: PropTypes.bool.isRequired,
}

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    dispatch => ({
      getClientDetails: id => dispatch(getClientDetails(id)),
      openDetailsWindow: () => dispatch(openDetailsWindow()),
      closeDetailsWindow: () => dispatch(closeDetailsWindow())
    })
  )
)(ClientDetails)