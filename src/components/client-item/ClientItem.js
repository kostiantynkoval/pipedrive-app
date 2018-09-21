import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItem from '@material-ui/core/ListItem'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import { withStyles } from '@material-ui/core/styles'
import BuildingIcon from '../building-icon/BuildingIcon'


const styles = {
  item: {
    border: '1px solid rgba(227,227,227, 0.7)',
    marginBottom: 7
  },
  itemText: {
    flexGrow: 1,
  },
  secondary: {
    display: 'flex',
    alignItems: 'center'
  },
  spanStyles: {
    lineHeight: '0.875rem',
    fontSize: '0.8rem',
    marginLeft: 5
  },
  avatar: {
    color: '#0098ED',
    fontSize: '1rem'
  },
  link: {
    textDecoration: 'none'
  }
}

const Secondary = ({children, classProps, spanStyles}) => (
  <span className={classProps}>
    <BuildingIcon/>
    <span className={spanStyles}>{children}</span>
  </span>
)

const ClientItem = (props) => {
  return (
    <Link className={props.classes.link} to={`/clients/${props.id}`}>
      <ListItem button className={props.classes.item}>
        <ListItemText
          primary={props.name}
          secondary={<Secondary spanStyles={props.classes.spanStyles} classProps={props.classes.secondary}>{props.org_id.name}</Secondary>}
          className={props.classes.itemText}
        />
        <ListItemAvatar>
          {
            props.picture_id === null ?
              <Avatar className={props.classes.avatar}>{props.first_name.charAt(0)}{props.last_name.charAt(0)}</Avatar> :
              <Avatar className={props.classes.avatar}>OP</Avatar> // TODO find out how to fetch image by id
          }

        </ListItemAvatar>
      </ListItem>
    </Link>
  )
}

ClientItem.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ClientItem)
