import axios from 'axios';

const intance = axios.create();

const get = (path, header) => {
    return intance.get(path, header);
};

const methods = {
    get
}

export default methods;
