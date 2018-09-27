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

const getAvatar = (first_name, last_name, name) => {
  if(first_name && last_name) {
    return `${first_name.charAt(0)}${last_name.charAt(0)}`
  } else if(name) {
    const nameArr = name.split(' ')
    if(nameArr.length > 1) {
      return `${nameArr[0].charAt(0)}${nameArr[nameArr.length -1 ].charAt(0)}`
    } else {
      return `${nameArr[0].charAt(0)}`
    }
  } else {
    return '??'
  }
}

const getPicture = (picture_id, picture) => {
  if (picture_id) {
    return picture_id.pictures['128']
  } else if(picture) {
    return picture.url
  } else {
    return null
  }
}

const ClientItem = ({id, name, org_id, org_name, picture_id, picture, classes, first_name, last_name}) => {
  const orgObjName = org_id ? org_id.name : ''
  const orgName = org_name ? org_name : ''
  const org = orgObjName || orgName;
  const pictureUrl = getPicture(picture_id, picture)
  return (
    <Link className={classes.link} to={`/clients/${id}`}>
      <ListItem button className={classes.item}>
        <ListItemText
          primary={name}
          secondary={<Secondary spanStyles={classes.spanStyles} classProps={classes.secondary}>{org}</Secondary>}
          classes={{primary: classes.primary}}
        />
        <ListItemAvatar>
          <Avatar
            className={classes.avatar}>
            {
              pictureUrl === null ?
                <span>{getAvatar(first_name, last_name, name)}</span>
                :
                <img width={'100%'} src={pictureUrl} alt=""/>
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
