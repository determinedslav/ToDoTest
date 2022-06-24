import './App.css';
import API from './network/RequestHandler';
import React, {useState} from 'react';

function App() {

  const [tasks, setTasks] = useState([{ id: 0, name : "Example Task", description: "Example Task Description", hoursLeft : 0, priority : 0}]);
  const [title, setTitle] = useState(' ');
  const [description, setDescription] = useState(' ');
  const [due, setDue] = useState(' ');
  const [errorMessage, setErrorMessage] = useState(' ');
  const [disableButton, setDisableButton] = useState(false);

  const getAllTasks = () =>  {
    API.getAll().then(response => { 

      var tasksTempHolder = response.data.data
      console.log(tasksTempHolder);

      tasksTempHolder.forEach(task => {
        var hoursLeft = getDateDifference(task.dueDate);
        task.hoursLeft = hoursLeft;

        task.priority = getPriorityValue(task);
      });

      tasksTempHolder.sort((a, b) => {
        if (a.priority === b.priority){
          return a.hoursLeft < b.hoursLeft ? -1 : 1
        } else {
          return b.priority < a.priority ? -1 : 1
        }
      });

      setTasks(tasksTempHolder);
    }).catch(error => {
      console.log(error.toJSON());
  }).then(()=>{
    setDisableButton(false);
  })};

  const createTask = () => {
    const postParams = {
      "name":title,
      "description": description,
      "dueIn": due
    };

    setDisableButton(true);
    API.post(postParams).then(response => {  
      console.log(response.status);
    }).catch(error => {
      console.log(error.toJSON());
      setErrorMessage("An error has occured while trying to create a new task")
    }).then(()=>{
      getAllTasks();
    });
  };

  const completeTask = (key) => {
    var updateparams = tasks[key];
    updateparams.isDone = true;

    setDisableButton(true);
    API.put(updateparams).then(response => {  
      console.log(response.status);
    }).catch(error => {
      console.log(error.toJSON());
    }).then(()=>{
      getAllTasks();
    });

  }

  const deleteTask = (id) => {
    setDisableButton(true);
    API.del(id).then(response => {  
      console.log(response.status);
    }).catch(error => {
      console.log(error.toJSON());
    }).then(()=>{
      getAllTasks();
    });
  }
  

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

  const getStyle = (priority, hoursLeft) => {
    switch (priority) {
      case 10:
        return  <div className="bg-success m-4 p-2 d-inline-block rounded">
                  Completed
                </div>
      case 20:
        return  <div className="bg-danger m-4 p-2 d-inline-block rounded">
                  Expired
                </div>
      case 30:
        return  <div className="bg-primary m-4 p-2 d-inline-block rounded">
                  {hoursLeft + " hour(s) left"}
                </div>
      case 40:
        return  <div className="bg-warning m-4 p-2 d-inline-block rounded">
                  {hoursLeft + " hours left"}
                </div>
      default:
        return  <div className="bg-white m-4 p-2 d-inline-block rounded">
                  Example
                </div>
    }
  }

  const getDateDifference = (date) => {
    var currentDate = new Date(new Date().toISOString())
    var taskDate = new Date(date);
    var diff = taskDate - currentDate;
    return Math.ceil(diff / (1000 * 60 * 60) +3);
  }

  const getPriorityValue = (task) => {
    if (task.isDone) {
      return 10;
    } else if (task.hoursLeft <= 0) {
      return 20;
    } else if (task.hoursLeft < 12) {
      return 40;
    } else {
      return 30;
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
                <button className={disableButton===false ? "btn btn-primary" : "btn disabled"} onClick = {() => validate()}>Create Task</button>
              </div>
            </div>
          </div>
        </form>
        <div className="bg-light border rounded mt-5">
          <div className="border p-3 d-flex justify-content-between">
            <div className="h5 p-2">
              List of all Tasks
            </div>
            <div className="p-1">
              <button className='btn btn-primary' onClick={() => getAllTasks()}>Reload Tasks</button>
            </div>
          </div>
          {// eslint-disable-next-line
            tasks.map((task, i) => {
              return <div className="border p-4 bg-white" key={i}>
              <div className="mb-3">
                <div className="p-2">
                  Title
                </div>
                <div className="mb-2 text-wrap">
                  <textarea className="form-control mt-2" id="title" value={task.name} rows={1} readOnly/>
                </div>
              </div>
              <div className="mb-4">
                <div className="p-2">
                  Description
                </div>
                <div className="mb-2">
                  <textarea className="form-control mt-2" id="description" value={task.description} rows={6} readOnly/>
                </div>
              </div>
              <div className="mb-3">
                <div className="p-2 d-inline-block">
                  Status:
                </div>
                {getStyle(task.priority, task.hoursLeft)}
              </div>
              <div className="p-3 d-flex justify-content-between">  
                <div className="">
                  <button className={disableButton===false && task.priority >20 ? "btn btn-success btn-lg" : "btn btn-outline-success btn-lg disabled"} onClick = {() => completeTask(i)}>Finish Task</button>
                </div>         
                <div className="">
                  <button className={disableButton===false && task.priority >20 ? "btn btn-danger btn-lg" : "btn btn-outline-danger btn-lg disabled"} onClick = {() => deleteTask(task.id)}>Delete Task</button>
                </div>
              </div>
            </div>
          })}
          <div className="border p-4">           
          </div>
        </div>
      </div>
    </div>
  }
  </div>
}

export default App;
