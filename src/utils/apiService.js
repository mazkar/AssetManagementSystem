import {baseUrl} from './apiURL';
import axios from 'axios';
import {encode as btoa} from 'base-64';
const apiUrl = baseUrl.URL;

global.btoa = btoa;

const Login = path => data => {
  const promise = new Promise((resolve, reject) => {
    axios
      .get(`${apiUrl}${path}`, {
        auth: {
          username: data.username,
          password: data.password,
        },
      })
      .then(
        result => {
          resolve(result);
          console.log(result, 'err');
        },
        err => {
          reject(err);
          console.log(err, 'err');
        },
      );
  });
  return promise;
};

const API = {
  Login,
};

export default API;
