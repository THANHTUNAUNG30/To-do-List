import "./App.css";
import React, { useState, useEffect } from "react";
import Form from "./components/Form.jsx";
import List from "./components/List.jsx";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { api } from "./api/apiResource.js";
import uuid from "react-uuid";

function App() {
  const [messages, setMessages] = useState([]);
  const [editMessage, setEditMessage] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    const texts = await api.get("/todolist");
    setMessages(texts.data);
  };

  useEffect(() => {
    fetchData();
  }, [messages]);

  const addEvent = async (userTasks) => {
    const data = {
      id: uuid(),
      message: userTasks,
      status: false,
    };

    await api.post("/todolist", data);
  };

  const deleteEvent = async (message_id) => {
    await api.delete(`/todolist/${message_id}`);
  };

  const updateEvent = async (message_id, status) => {
    await api.patch(`/todolist/${message_id}`, { status });
  };

  const editEvent = (message_id, message) => {
    setEditId(message_id);
    setEditMessage(message);
  };

  const handleSave = async () => {
    // Update the message in the API
    await api.patch(`/todolist/${editId}`, { message: editMessage });
    // Update state locally
    setMessages(
      messages.map((msg) =>
        msg.id === editId ? { ...msg, message: editMessage } : msg
      )
    );
    // Hide the edit form and buttons
    setEditId(null);
    setEditMessage("");
  };

  const handleCancel = () => {
    // Clear the form and hide the buttons
    setEditId(null);
    setEditMessage("");
  };

  return (
    <div className="App">
      <div className="">
        <h1 className="mx-5">To do list</h1>
        <Form addEvent={addEvent} />

        {editId && (
          <div className="row">
            <div className="col">
              <input
                type="text"
                value={editMessage}
                onChange={(e) => setEditMessage(e.target.value)}
                className="form-control me-3"
              />
            </div>
            <div className="col">
              <button
                className="btn btn-success me-3"
                onClick={handleSave} 
              >
                Save
              </button>
              <button
                className="btn btn-danger"
                onClick={handleCancel} 
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <List
          messages={messages}
          deleteEvent={deleteEvent}
          updateEvent={updateEvent}
          editEvent={editEvent}
        />
      </div>
    </div>
  );
}

export default App;
