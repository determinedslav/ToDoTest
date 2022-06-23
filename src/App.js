import './App.css';
import remote from './network/remote';

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
    remote.getAll().then(response => { 
      console.log(response.data.data);  
      console.log(response.status);
    });

    remote.get("16").then(response => { 
      console.log(response.data.data);  
      console.log(response.status);
    });

  };
  

  return (
    <div className="App">
      <p>test</p>
      <button onClick={() => myFunction()}>Click me</button> 
    </div>
  );
}

export default App;
