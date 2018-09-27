import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {getClientDetails, openDetailsWindow, closeDetailsWindow, deleteClient, updateClientPicture} from '../../store/actions'
import {withStyles} from '@material-ui/core/styles'
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
import Popover from '../popover/Popover'

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
    alignItems: 'center',
    tabIndex: 1
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
    textTransform: 'uppercase',
    position: 'relative',
  },
  label: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    opacity: 0,
    background: 'rgba(0,0,0,0.8)',
    cursor: 'pointer',
    transition: 'opacity .3s ease',
    '&:hover': {
      opacity: 1
    }
  },
  labelText: {
    color: 'white',
    textTransform: 'none',
    fontSize: '0.65rem',
    marginBottom: 7
  },
  imgError: {
    fontSize: '0.65rem',
    color: 'darkred',
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

class ClientDetails extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isConfirmOpen: false,
      imgError: ''
    }
  }

  componentDidMount() {
    const {match: {params: {id}}, getClientDetails } = this.props;
    getClientDetails(id)
  }

  // triggering updating picture action on file added, also checking file types "jpg, jpeg, png"
  onChange = (e) => {
    const {match: {params: {id}}, updateClientPicture } = this.props;
    this.setState({imgError: ''})
    const file = new FormData()
    file.append('file', e.target.files[0])
    if(e.target.files[0].type === 'image/jpg' || e.target.files[0].type === 'image/jpeg' || e.target.files[0].type === 'image/png') {
      updateClientPicture(id, file)
    } else {
      this.setState({imgError: 'Wrong file type'})
    }

  }

  handleClose = () => {
    const {history: {push}, closeDetailsWindow } = this.props;
    closeDetailsWindow()
    push('/')
  };

  confirmDelete = () => {
    this.setState({isConfirmOpen: true})
  }

  deleteItem = () => {
    const {match: {params: {id}}, history, deleteClient, pagination: { start, limit } } = this.props;
    deleteClient(id, history, start, limit)
  }

  closeWindow = () => {
    this.setState({isConfirmOpen: false})
  }

  render() {
    const {classes, selectedClient, isClientLoading, isClientImgLoading, match, isDetailsActive} = this.props;
    if (isClientLoading) {
      return <Loader/>
    } else {
      return (
        <Modal
          disableAutoFocus={true}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={isDetailsActive}
          onClose={this.handleClose}
          className={classes.modal}
        >
          <Fragment>
            {
              this.state.isConfirmOpen && <Popover isOpen={this.state.isConfirmOpen} handleClickAgreeButton={this.deleteItem}
                                                   handleClickDisagreeButton={this.closeWindow}/>
            }

            <Card className={classes.paper}>
              <CardHeader
                classes={{root: classes.root, title: classes.title, action: classes.action}}
                action={
                  <IconButton onClick={this.handleClose}>
                    <Times/>
                  </IconButton>
                }
                title="Person Information"
              />
              {
                selectedClient && (
                  <CardContent className={classes.content}>
                    <div className={classes.main}>
                      { this.state.imgError !== '' && <div className={classes.imgError}>{this.state.imgError}</div> }
                      <Avatar
                        className={classes.avatar}>
                        { isClientImgLoading && <div style={{ position: 'absolute', top: 0, left: 0, width: 60, height: 60, background: 'rgba(0,0,0,0.8)'}} /> }
                        <input onChange={this.onChange} style={{display: 'none'}} id="picUpd" type="file"/>
                        <label htmlFor="picUpd" className={classes.label}>
                          <span className={classes.labelText}>update</span>
                        </label>
                        {
                          selectedClient.picture_id === null ?
                            <span>
                              {selectedClient.first_name ? selectedClient.first_name.charAt(0) : ''}
                              {selectedClient.last_name ? selectedClient.last_name.charAt(0) : ''}
                            </span>
                          :
                            <img width={'100%'} src={selectedClient.picture_id.pictures['128']} alt=""/>
                        }
                      </Avatar>
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
                          <div className={classes.rowData}>{selectedClient['org_name']}</div>
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
                          <div className={classes.rowData}>{selectedClient.org_id ? selectedClient.org_id.address : ''}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                )
              }

              <CardActions className={classes.actions}>
                <Link className={classes.link} to={`/clients/${match.params.id}/update`}>
                  <Button variant="outlined" color="primary" className={classes.button}>
                    Update
                  </Button>
                </Link>
                <Button variant="outlined" color="secondary" className={classes.button} onClick={this.confirmDelete}>
                  Delete
                </Button>
                <Button variant="outlined" className={classes.button} onClick={this.handleClose}>
                  Back
                </Button>
              </CardActions>
            </Card>
          </Fragment>
        </Modal>
      )
    }
  }
}

const mapStateToProps = state => ({
  selectedClient: state.clients.selectedClient,
  isDetailsActive: state.clients.isDetailsActive,
  isClientLoading: state.clients.isClientLoading,
  isClientImgLoading: state.clients.isClientImgLoading,
  pagination: state.clients.pagination
})

ClientDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedClient: PropTypes.object,
  pagination: PropTypes.object.isRequired,
  isDetailsActive: PropTypes.bool.isRequired,
  isClientLoading: PropTypes.bool.isRequired,
  isClientImgLoading: PropTypes.bool.isRequired,
  getClientDetails: PropTypes.func.isRequired,
  deleteClient: PropTypes.func.isRequired,
  openDetailsWindow: PropTypes.func.isRequired,
  closeDetailsWindow: PropTypes.func.isRequired,
  updateClientPicture: PropTypes.func.isRequired
}

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    dispatch => ({
      getClientDetails: id => dispatch(getClientDetails(id)),
      deleteClient: (id, history, start, limit) => dispatch(deleteClient(id, history, start, limit)),
      openDetailsWindow: () => dispatch(openDetailsWindow()),
      closeDetailsWindow: () => dispatch(closeDetailsWindow()),
      updateClientPicture: (id, data) => dispatch(updateClientPicture(id, data))
    })
  )
)(ClientDetails)