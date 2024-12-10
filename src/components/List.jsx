import React from 'react'
import Card from './Card'

const List = ({messages, deleteEvent, updateEvent, editEvent}) => {
  return (
    <div>
      <ol className="list-group">
        <Card messages={messages} deleteEvent={deleteEvent} updateEvent={updateEvent} editEvent={editEvent}/>
      </ol>
    </div>
  )
}

export default List
