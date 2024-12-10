import React from "react";

const Card = ({ messages, deleteEvent, updateEvent, editEvent }) => {

  const delForm = (message_id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are u sure?")) {
      deleteEvent(message_id);
    }
  };

  

  return (
    <div>
      {messages.map((message) => (
        <div key={message.id} className={message.status ? "list-group-item w-100 shadow-sm my-2 bg-success text-decoration-line-through text-white" : "list-group-item w-100 shadow-sm my-2"}>
          <div className="row">
            <div className="col-8 offset-1 fs-4">
              <input type="checkbox" className="me-3" onClick={()=> updateEvent(message.id, !message.status)} defaultChecked={message.status}/>{message.message}
              </div>
            <div className="col-3">
              <i
                className="fa-solid fa-trash me-4"
                onClick={() => delForm(message.id)}
              ></i>
              <i className="fa-solid fa-pen-to-square" onClick={()=> editEvent(message.id, message.message)}></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;