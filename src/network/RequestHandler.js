import token from './constants/Authorization';
import ToDoAPI from './constants/ToDoAPI';
import remote from './remote';

const getAll = () =>{
    return remote.get(ToDoAPI.getAll, token);
}

const get = (id) => {
    return remote.get(ToDoAPI.get + id, token);
}

const actions = {
    getAll,
    get
}

export default actions;
