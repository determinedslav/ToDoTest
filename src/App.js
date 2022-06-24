import './App.css';
import API from './network/RequestHandler';
import React, {useState} from 'react';

function App() {

  const [status, setStatus] = useState('test');
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState(' ');
  const [description, setDescription] = useState(' ');
  const [due, setDue] = useState(' ');
  const [errorMessage, setErrorMessage] = useState(' ');

  const myFunction = () => {
    /*
    var url = "https://auto.loanvantage360.com/fps/api/todo";

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.setRequestHeader("Authorization", "Bearer YzQ2ZWVhM2QtY2MxNi00MGMwLTkwOTYtNjJiMGE3YjFlM2MzOmUxNTQ4M2FmLTk4OGQtNDc1My1iYjU5LTkyNmU4ZDAwZjQzMw==");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        console.log(xhr.status);
        console.log(xhr.responseText);
    }};

    xhr.send();
    */  

    //test requests

    const updateparams = {
      "id": 60,
      "name": "test",
      "description": "test",
      "dueDate": "2022-06-23T17:37:19.377",
      "isDone": true
  };

    API.getAll().then(response => { 
      setTasks(response.data.data);  
      setStatus(response.status);
      console.log(response.data.data);
    });

    API.get("16").then(response => { 
      console.log(response.data.data);  
      console.log(response.status);
    });

    //API.put(updateparams).then(response => {  
    //  console.log(response.status);
    //});

    //API.del("65").then(response => {  
    //  console.log(response.status);
    //});

  };

  const getAllTasks = () =>  {
    API.getAll().then(response => { 
      console.log(response.data.data);
      setTasks(response.data.data);
    }).catch(error => {
      console.log(error.toJSON());
  })};

  const createTask = () => {
    const postParams = {
      "name":title,
      "description": description,
      "dueIn": due
    };

    API.post(postParams).then(response => {  
      console.log(response.status);
    }).catch(error => {
      console.log(error.toJSON());
      setErrorMessage("An error has occured while trying to create a new task")
    });

    getAllTasks();
  };
  

  const validate = () => {
    setErrorMessage(" ");
    if (title.trim().length === 0 || description.trim().length === 0 || due.trim().length === 0 || due % 1 !== 0 ) {
      console.log("Invalid data");
    } else if (title.length > 100) {
      setErrorMessage("Task title cannot be more than 100 characters long");
    } else if (description.length > 500) {
      setErrorMessage("Task description cannot be more than 500 characters long");
    } else {
      setErrorMessage(" ");

      createTask();
    }
  }  

  return <div>
    {
    <div className="d-flex justify-content-center">
      <div className="m-5 p-3 w-75">
        <form id="searchUser" onSubmit={(e) => e.preventDefault()}>
          <div className="bg-light border rounded mb-5">
            <div className="border p-3">
              <div className="h5 p-2">
                Create a new Task
              </div>
            </div>
            <div className="border p-4">
              <div className="mb-3">
                <div className="p-2">
                  Title
                </div>
                <div className="mb-2">
                  <input type="text" className="form-control mt-2" id="title" placeholder="Task Title (up to 100 characters)" onChange={e => setTitle(e.target.value)} required/>
                </div>
              </div>
              <div className="mb-4">
                <div className="p-2">
                  Description
                </div>
                <div className="mb-2">
                  <textarea className="form-control mt-2" id="description" placeholder="Task Description (up to 500 characters)" rows={4} onChange={e => setDescription(e.target.value)} required/>
                </div>
              </div>
              <div className="mb-3">
                <div className="p-2 d-inline-block">
                  Due In
                </div>
                <div className="d-inline-block">
                  <input type="number" className="form-control" id="due" placeholder="Time limit in hours" onChange={e => setDue(e.target.value)} required/>
                </div>
              </div>
            </div>
            <div className="border p-3 d-flex justify-content-between">  
              <div className="p-2 m-2 text-danger" id="errMessage">
                {errorMessage}
              </div>         
              <div className="p-2">
                <button className="btn btn-primary" onClick = {() => validate()}>Create Task</button>
              </div>
            </div>
          </div>
        </form>
        <div className="bg-light border rounded mt-5">
            <div className="border p-3">
              <div className="h5 p-2">
                List of all Tasks
              </div>
            </div>
            {// eslint-disable-next-line
              tasks.map((tasks) => {
                return <div className="border p-4 bg-white" key={tasks.id}>
                <div className="mb-3">
                  <div className="p-2">
                    Title
                  </div>
                  <div className="mb-2 text-wrap">
                    <textarea className="form-control mt-2" id="title" value={tasks.name} rows={1} readOnly/>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="p-2">
                    Description
                  </div>
                  <div className="mb-2">
                    <textarea className="form-control mt-2" id="description" value={tasks.description} rows={6} readOnly/>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="p-2 d-inline-block">
                    Status:
                  </div>
                  <div className="d-inline-block">
                    {tasks.dueDate}
                  </div>
                </div>
              </div>
            })}
            <div className="border p-4">           
            </div>
          </div>
      <div className="">
        {// eslint-disable-next-line
          tasks.map((tasks) => {
            return <span key={tasks.id} className="ml-2">
              <p>{tasks.name}</p>
            </span>
        })}
        <button className='btn btn-primary' onClick={() => myFunction()}>{status}</button> 
      </div>
    </div>
  </div>
  }
  </div>
}

export default App;
