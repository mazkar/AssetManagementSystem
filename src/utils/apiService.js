import {baseUrl} from './apiURL';
import axios from 'axios';

const apiUrl = baseUrl.URL;

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
        },
        err => {
          reject(err);
        },
      );
  });
  return promise;
};

const API = {
  Login,
};

export default API;
