import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Logo from '../logo/Logo'
import SearchIcon from '../search-icon/SearchIcon'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';


const styles = {
  root: {
    background: '#222'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    borderColor: '#ddd',
    '&>div:after': {
      borderColor: '#ddd'
    }
  }
};

class Header extends React.Component {
  state = {
    inputVal: ''
  }

  handleChange = (e) => {
    this.setState({inputVal: e.target.value})
  }

  searchClients = () => {
    this.props.searchClients(this.state.inputVal)
  }

  render() {
    const { classes } = this.props
    return (
      <AppBar className={classes.root} position="fixed">
        <Toolbar classes={{root: classes.toolbar}}>
          <Typography variant="title">
            <Logo/>
          </Typography>
          <TextField
            id="standard-bare"
            variant="standard"
            classes={{marginDense: classes.input}}
            placeholder="Search"
            margin="dense"
            onChange={this.handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Search Client"
                    onClick={this.searchClients}
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
              style: {
                color: '#ddd',
                borderColor: '#ddd'
              }
            }}
          />
        </Toolbar>
      </AppBar>
    )
  }
}
Header.propTypes = {
  classes: PropTypes.object.isRequired,
  searchClients: PropTypes.func.isRequired
}

export default withStyles(styles)(Header)