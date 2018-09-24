import React, { Component } from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import PropTypes from 'prop-types'
import {getClients} from '../../store/actions'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import ClientItem from '../client-item/ClientItem'
import List from '@material-ui/core/List'
import { withStyles } from '@material-ui/core/styles'
import TablePagination from '@material-ui/core/TablePagination'

const styles = () => ({
  caption: {
    '&:last-of-type': {
      display: 'none'
    }
  },
  selectRoot: {
    marginRight: 0
  },
  actions: {
    marginLeft: 5
  }
});

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  marginBottom: '7px',

  // change background colour if dragging
  background: isDragging && 'lightgreen',

  // styles we need to apply on draggables
  ...draggableStyle,
})

const getListStyle = isDraggingOver => ({
  background: isDraggingOver && 'lightblue',
})

class ClientsList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      items: props.clients,
    }
  }

  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    )

    this.setState({
      items,
    })
  }

  handleChangePage = () => {}

  onPrevClicked = () => {
      this.props.getClients(this.props.pagination.start - this.props.pagination.limit, this.props.pagination.limit)
  }

  onNextClicked = () => {
      this.props.getClients(this.props.pagination.next_start, this.props.pagination.limit)
  }

  handleChangeRowsPerPage = event => {
    console.log('event', event.target.value, this.state.rowsPerPage)
    if(event.target.value !== this.state.rowsPerPage) {
      this.props.getClients(0, event.target.value)
      console.log('event', event.target.value, this.state)
    }
  }

  render() {
    const { items, rowsPerPage } = this.state
    const { pagination: { start, limit, more_items_in_collection, next_start }, classes } = this.props
    return (
      <DragDropContext onDragEnd={this.onDragEnd} >
        <List>
        <Droppable droppableId="droppable">
            { (provided, snapshot) => (
            <div ref={provided.innerRef}
                 style={getListStyle(snapshot.isDraggingOver)}>
            {
              items.map( (client, index) =>
                <Draggable key={client.id} draggableId={client.id} index={index}>
                  { (provided, snapshot) => (
                    <div ref={provided.innerRef}
                         {...provided.draggableProps}
                         {...provided.dragHandleProps}
                         style={getItemStyle(
                             snapshot.isDragging,
                             provided.draggableProps.style
                         )} >
                      <ClientItem {...client}/>
                    </div>
                  ) }
                </Draggable> )
            }
            </div>
            ) }
        </Droppable>
          <TablePagination
            classes={classes}
            //variant="caption"
            component="div"
            count={items.length}
            rowsPerPage={items.length}
            page={0}
            rowsPerPageOptions={[5,10,15,20]}
            backIconButtonProps={{
              disabled: start === 0,
              'aria-label': 'Previous Page',
              onClick: this.onPrevClicked
            }}
            nextIconButtonProps={{
              disabled: !more_items_in_collection,
              'aria-label': 'Next Page',
              onClick: this.onNextClicked
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </List>
      </DragDropContext>
    );
  }
}


ClientsList.propTypes = {
  classes: PropTypes.object.isRequired,
  pagination: PropTypes.object.isRequired,
  clients: PropTypes.array.isRequired,
}

export default compose(
  withStyles(styles),
  connect(
    state => ({
      pagination: state.clients.pagination
    }),
    dispatch => ({
      getClients: (start, limit) => dispatch(getClients(start, limit))
    })
  )
)(ClientsList);

connect(
  state => ({
      pagination: state.clients.pagination
  }),
  dispatch => ({
    getClients: () => dispatch(getClients())
  })
)
