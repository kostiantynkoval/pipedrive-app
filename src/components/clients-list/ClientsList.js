import React, { Component } from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import PropTypes from 'prop-types'
import { getClients, searchClients, updateClient } from '../../store/actions'
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
    const { getClients, updateClient, pagination: { start, limit } } = this.props

    // if dropped outside the list or item stayed on same position
    if (!result.destination || result.source.index === result.destination.index) {
      return
    }

    const items = this.reorderInProps(
      this.state.items,
      result.source.index,
      result.destination.index
    )

    this.setState({
      items,
    })

    let Promises = []
    let startIndex, endIndex
    if(result.source.index < result.destination.index) {
      startIndex = result.source.index;
      endIndex = result.destination.index;
    } else {
      startIndex = result.destination.index;
      endIndex = result.source.index;
    }

    for (let i = startIndex; i <= endIndex; i++) {
      Promises[i] =  updateClient({id: items[i].id, '7876c07667bae0482c5d9bad11c0268688fbc544': items[i]['7876c07667bae0482c5d9bad11c0268688fbc544']}, null, null, null)
    }

    Promise.all(Promises).then(() => getClients(start, limit, true))
  }

  reorderInProps = (list, startIndex, endIndex) => {
    console.log(startIndex, endIndex)
    const { pagination: { start, limit } } = this.props
    if (startIndex < endIndex) {

      list[startIndex]['7876c07667bae0482c5d9bad11c0268688fbc544'] = start + endIndex - startIndex
      for (let i = startIndex + 1; i <= endIndex; i++) {
        list[i]['7876c07667bae0482c5d9bad11c0268688fbc544'] = start + i - 1
      }
    } else if(startIndex > endIndex) {

      list[startIndex]['7876c07667bae0482c5d9bad11c0268688fbc544'] = start + limit + endIndex - startIndex -1
      for (let i = startIndex - 1; i >= endIndex; i--) {
        list[i]['7876c07667bae0482c5d9bad11c0268688fbc544'] = start + i + 1
      }
    }

    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result

  }

  handleChangePage = () => {}

  onPrevClicked = () => {
    const { searchTerm, searchClients, getClients, pagination: { start, limit } } = this.props
    if(searchTerm) {
      searchClients(searchTerm, start - limit, limit)
    } else {
      getClients(start - limit, limit)
    }
  }

  onNextClicked = () => {
    const { searchTerm, searchClients, getClients, pagination: { limit, next_start } } = this.props
    if(searchTerm) {
      searchClients(searchTerm, next_start, limit)
    } else {
      getClients(next_start, limit)
    }

  }

  handleChangeRowsPerPage = event => {
    const { searchTerm, searchClients, getClients, pagination: { start, limit } } = this.props
    if(searchTerm) {
      if(event.target.value !== limit) {
        searchClients(searchTerm, start, event.target.value)
      }
    } else {
      if(event.target.value !== limit) {
        getClients(start, event.target.value)
      }
    }

  }

  render() {
    console.log('rerender', this.state.items)
    const { items } = this.state
    const { pagination: { start, limit, more_items_in_collection }, classes } = this.props

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
            component="div"
            count={2}
            rowsPerPage={limit}
            page={0}
            rowsPerPageOptions={[5,10,15,20,50]}
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
  searchTerm: PropTypes.string,
  getClients: PropTypes.func.isRequired,
  searchClients: PropTypes.func.isRequired
}

export default compose(
  withStyles(styles),
  connect(
    state => ({
      pagination: state.clients.pagination,
      searchTerm: state.clients.searchTerm
    }),
    dispatch => ({
      getClients: (start, limit, isReorder = null) => dispatch(getClients(start, limit, isReorder)),
      searchClients: (term, start, limit) => dispatch(searchClients(term, start, limit)),
      updateClient: (data, history, start, limit) => dispatch(updateClient(data, history, start, limit))
    })
  )
)(ClientsList);