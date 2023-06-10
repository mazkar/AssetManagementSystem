import {useDispatch} from 'react-redux';
import API from '../utils/apiService';
import {setToken} from '../store/models/auth/actions';

export const ApiToken = async (username, password) => {
  const userdata = {
    username: username,
    password: password,
  };
  const token = API.Login('api/auth/authWeb')(userdata).then(result => {
    return result.data.message;
  });
  return token;
};

export const LoginAPI = async (username, password) => {
  const token = await ApiToken(username, password);
  console.log('i am loginbyauth :', token);

  //   localStorage.setItem('token', token);

  return token;
};
