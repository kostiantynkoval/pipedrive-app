import React from 'react';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {withStyles} from '@material-ui/core/styles'

const styles = {
  container: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  root: {
    tabIndex: -1,
    padding: 15,
  }
}

const Popover = (props) => {
  return (
      <Modal
        aria-labelledby="inner-modal-title"
        aria-describedby="inner-modal-description"
        open={props.isOpen}
        onClose={props.handleClickDisgreeButton}
        classes={{root: props.classes.container}}
      >
        <Paper className={props.classes.root}>
          <DialogTitle>Are you sure</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Confirm delete
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClickDisagreeButton} color="primary">
              Disagree
            </Button>
            <Button onClick={props.handleClickAgreeButton} color="secondary">
              Agree
            </Button>
          </DialogActions>
        </Paper>
      </Modal>
  );
};

export default withStyles(styles)(Popover);