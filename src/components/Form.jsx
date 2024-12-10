import React, { useState } from "react";
import "./Form.css";

const Form = ({addEvent}) => {

  const [userTasks,setUserTasks] = useState("");

  const formHandaling = (userTasks)=>{
    if(userTasks === ""){
      alert("Please type something.")
    }else{
      addEvent(userTasks)
      setUserTasks("");
    }
  }
  
  return (
    <div>
      <div className="row mt-5 my-3">
        <div className="col">
          <input value={userTasks} type="text" onChange={ e=> setUserTasks(e.target.value) }
          className="form-control user_text" placeholder="Enter text..."/>
        </div>
        <div className="col">
          <button className="btn btn-success" onClick={()=> formHandaling(userTasks)}>
            <i className="fa-solid fa-plus"></i> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
