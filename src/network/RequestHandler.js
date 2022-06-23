import token from './constants/Authorization';
import ToDoAPI from './constants/ToDoAPI';
import remote from './remote';

//get list of all tasks
const getAll = () =>{
    return remote.get(ToDoAPI.getAll, token);
};

//get task with given id
const get = (id) => {
    return remote.get(ToDoAPI.get + id, token);
};

//create a new task with the given parameters
const post = (params) => {
    return remote.post(ToDoAPI.post, params, token);
};

//update an existing task with the given parametars
const put = (params) => {
    return remote.put(ToDoAPI.put, params, token);
};

//delete a task with given id
const del = (id) => {
    return remote.del(ToDoAPI.del +id, token);
};

const actions = {
    getAll,
    get,
    post,
    put,
    del
}

export default actions;
