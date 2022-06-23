import axios from 'axios';
import token from '../constants/Authorization';

const intance = axios.create();

const getAll = () =>{
    return intance.get("https://auto.loanvantage360.com/fps/api/todo", token);
}

const get = (id) => {
    return intance.get("https://auto.loanvantage360.com/fps/api/todo/" + id, token);
}

const methods = {
    getAll,
    get
}

export default methods;
