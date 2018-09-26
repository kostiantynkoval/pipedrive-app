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
  primary: {
    flexGrow: 1,
    fontFamily: 'Open Sans, sans-serif',
  },
  secondary: {
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Open Sans, sans-serif',
  },
  spanStyles: {
    lineHeight: '0.875rem',
    fontSize: '0.8rem',
    marginLeft: 5
  },
  avatar: {
    color: '#0098ED',
    fontSize: '1rem',
    fontFamily: 'Open Sans, sans-serif',
    textTransform: 'uppercase'
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

const getAvatar = (props) => {
  if(props.first_name && props.last_name) {
    return `${props.first_name.charAt(0)}${props.last_name.charAt(0)}`
  } else if(props.name) {
    const name = props.name.split(' ')
    if(name.length > 1) {
      return `${name[0].charAt(0)}${name[name.length -1 ].charAt(0)}`
    } else {
      return `${name[0].charAt(0)}`
    }
  } else {
    return '??'
  }

}

const ClientItem = (props) => {
  const orgObjName = props.org_id ? props.org_id.name : ''
  const orgName = props.org_name ? props.org_name : ''
  const org = orgObjName || orgName;
  const pictureId = props.picture_id || props.picture || null
  return (
    <Link className={props.classes.link} to={`/clients/${props.id}`}>
      <ListItem button className={props.classes.item}>
        <ListItemText
          primary={props.name}
          secondary={<Secondary spanStyles={props.classes.spanStyles} classProps={props.classes.secondary}>{org}</Secondary>}
          classes={{primary: props.classes.primary}}
        />
        <ListItemAvatar>
          <Avatar
            className={props.classes.avatar}>
            {
              pictureId === null ?
                <span>{getAvatar(props)}</span>
                :
                <img width={'100%'} src={pictureId.pictures['128']} alt=""/>
            }
          </Avatar>
        </ListItemAvatar>
      </ListItem>
    </Link>
  )
}

ClientItem.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ClientItem)
