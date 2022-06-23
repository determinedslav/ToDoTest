import './App.css';
import API from './network/RequestHandler';

function App() {

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
    const postParams = {
      "name":"1stparty",
      "description": "1st party request",
      "dueIn": 10
    };

    const updateparams = {
      "id": 60,
      "name": "test",
      "description": "test",
      "dueDate": "2022-06-23T17:37:19.377",
      "isDone": true
  };
    
    API.getAll().then(response => { 
      console.log(response.data.data);  
      console.log(response.status);
    });

    API.get("16").then(response => { 
      console.log(response.data.data);  
      console.log(response.status);
    });

    //API.post(postParams).then(response => {  
    //  console.log(response.status);
    //});

    //API.put(updateparams).then(response => {  
    //  console.log(response.status);
    //});

    //API.del("65").then(response => {  
    //  console.log(response.status);
    //});

  };
  

  return (
    <div className="App">
      <p>test</p>
      <button onClick={() => myFunction()}>Click me</button> 
    </div>
  );
}

export default App;
