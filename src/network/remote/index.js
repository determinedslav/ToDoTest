import axios from 'axios';

const intance = axios.create();

const get = (path, header) => {
    return intance.get(path, header);
};

const post = (path, params, header) => {
    return intance.post(path, params, header);
};

const put = (path, params, header) => {
    return intance.put(path, params, header);
};

const del = (path, header) => {
    return intance.delete(path, header);
};

const methods = {
    get,
    post,
    put,
    del
}

export default methods;
