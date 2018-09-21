import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Logo from '../logo/Logo'

const styles = {
  root: {
    background: '#222'
  },
};

const Header = ({classes}) => (
  <AppBar className={classes.root} position="static">
    <Toolbar>
      <Typography variant="title">
        <Logo/>
      </Typography>
    </Toolbar>
  </AppBar>
);

Header.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Header)