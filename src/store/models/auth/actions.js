import {showMessage} from 'react-native-flash-message';
import APIKit, {setClientToken} from '../../../services/APIKit';
import {decodeToken} from '../../../utils/initialApp';
import * as ActionType from './actionTypes';
import axios from 'axios';
import Config from 'react-native-config';
const BASE_URL = Config.BASE_URL;
import qs from 'qs';

export const loginUser = (payload) => (dispatch) => {
  console.log('===> action loginUser');
  console.log('data loginUser', payload);
  const {username, password, expDateToken} = payload;
  dispatch({type: ActionType.AUTH_SIGN_IN});

  //  >>>>> DELETE BELOW IF AUTH SERVICE ALREADY <<<<<
  // setTimeout(() => {
  //   dispatch({
  //     type: ActionType.AUTH_SIGN_IN_SUCCESS,
  //     payload: {
  //       token:
  //         'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsX25hbWUiOiJZb2xvIiwicm9sZSI6bnVsbCwidXNlcl9pZCI6OTA3LCJ1c2VyX25hbWUiOiJhZ3VzLm1pZnRhaEBpc3QuaWQiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiLCJ0cnVzdCJdLCJ2ZW5kb3JfaWQiOjIsInBvc2l0aW9uIjpudWxsLCJleHAiOjE2NDgyNjQ0MjIsImp0aSI6IjA0MzAxOGYyLTcwODMtNDU1Ny04ZGM3LTJmMTdmODg3NTRjYiIsImNsaWVudF9pZCI6InNlY3VyaXR5LWNsaWVudCJ9.EomKxIfULRIyLUKpHgtDHprC3INzj_3lMVrFtCygJRvFxnQc-jf5M5jvgCmf-rJVYv94oqT7ey_fPnCEQKMtQbRzxx1MDK9nMksrBzaU6yQcAlnS9T_dVE52T63B9o2KZh_4Lbn2IjGreaHSplpUyuGiTPWrJDYk_Fq200VnovOo34iu3L-CvCVRQFxezuOC4VlPOWUEw1yS9dfkXBaL9CgOIArldlQtEQZJsPdSIhqrQzzmySpvl_9c-ldThojh5rEfEcBmElR__8Cywr3mcgmGG7QgGzR4XWadVLB5EmZd7GmL7gafOC8q9dW_icczqIhmWEy4_9LFaDYnVoReag',
  //       message: null,
  //       userData: null,
  //       tokenExpired: null,
  //     },
  //   });
  // }, 500);

  // >>>>> UNCOMMENT BELOW IF AUTH SERVICE ALREADY <<<<<
  const data = qs.stringify({
    username,
    password,
    grant_type: 'password',
  });

  // console.log('data => ', data);
  axios
    .post(`${BASE_URL}/mobile/oauth/token`, data, {
      // APIKit.post('/mobile/oauth/token', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic c2VjdXJpdHktY2xpZW50OnNlY3VyaXR5LXNlY3JldA==',
      },
    })
    .then((response) => {
      console.log('res login lurr', response.data);
      const {access_token} = response.data;
      const decodedToken = decodeToken(access_token);
      const userData = {
        userId: decodedToken.user_id,
        vendorId: decodedToken.vendor_id,
        fullname: decodedToken.full_name,
        userType: decodedToken.role,
      };
      // const tokenExpired = decodedToken.exp;
      dispatch({
        type: ActionType.AUTH_SIGN_IN_SUCCESS,
        payload: {
          access_token,
          message: response.data.message,
          userData,
          tokenExpired: expDateToken,
        },
      });
      setClientToken(access_token);
      showMessage({
        message: 'Login Success',
        description: response.message,
        type: 'success',
      });
    })
    .catch((error) => {
      console.log('knp tuhh', error.response.data);
      // console.log('knp tuhh', error.message);
      if (error.message === 'Request failed with status code 401') {
        showMessage({
          message: 'Mohon Maaf,',
          description: 'Akun Tidak Dapat di Gunakan',
          type: 'danger',
        });
      } else {
        showMessage({
          message: 'Something wrong',
          // description: error.message,
          description:
            error.response.data.error === 'invalid_credentials'
              ? error.response.data.error_description
              : error.message,
          type: 'danger',
        });
      }
      dispatch({
        type: ActionType.AUTH_SIGN_IN_FAILURE,
        payload: {
          message: error.message,
        },
      });
    });

  // =====| LOGIN USING FETCH |=====
  // const setClientTokenn = (token) => {
  //   console.log('+++ setClientToken', token);
  //   // eslint-disable-next-line dot-notation
  //   doLogin.common['Authorization'] = `Bearer ${token}`;
  // };
  // const requestOptions = {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //     Authorization: 'Basic c2VjdXJpdHktY2xpZW50OnNlY3VyaXR5LXNlY3JldA==',
  //   },
  //   body: qs.stringify({
  //     username,
  //     password,
  //     grant_type: 'password',
  //   }),
  // };
  // console.log('requestOptions ==>', requestOptions);
  // const doLogin = fetch(`${BASE_URL}/mobile/oauth/token`, requestOptions)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log('respopnse ==>', data.role);
  //     // console.log('respopnse token ==>', setClientTokenn);
  //     const {access_token} = data;
  //     const decodedToken = decodeToken(access_token);
  //     const userData = {
  //       userId: decodedToken.user_id,
  //       vendorId: decodedToken.vendor_id,
  //       fullname: decodedToken.fullname,
  //       userType: decodedToken.role,
  //     };
  //     const tokenExpired = decodedToken.exp;
  //     dispatch({
  //       type: ActionType.AUTH_SIGN_IN_SUCCESS,
  //       payload: {
  //         access_token,
  //         message: data.message,
  //         userData,
  //         tokenExpired,
  //       },
  //     });
  //     // setClientTokenn(access_token);
  //     showMessage({
  //       message: 'Login Success',
  //       description: data.message,
  //       type: 'success',
  //     });
  //   })
  //   .catch((error) => {
  //     // this.setState({errorMessage: error.toString()});
  //     console.error('There was an error!', error);
  //     showMessage({
  //       message: 'Something wrong',
  //       description: error.message,
  //       type: 'danger',
  //     });
  //     dispatch({
  //       type: ActionType.AUTH_SIGN_IN_FAILURE,
  //       payload: {
  //         message: error.message,
  //       },
  //     });
  //   });
};

export const resetReducer = () => (dispatch) => {
  console.log('===> action resetReducer');
  dispatch({type: 'resetReducer'});
};

export const logOut = (token, email) => async (dispatch) => {
  dispatch({type: ActionType.AUTH_SIGN_OUT});
  console.log(email, 'email pass');
  await axios
    .get(`${BASE_URL}/api/v1/users/api/v1/mobile/logout/${email}`, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `bearer ${token}`,
      },
    })
    .then((res) => {
      console.log('Res get SignOut', res.data);
      dispatch({
        type: ActionType.AUTH_SIGN_OUT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err, 'this is error get data Sognout');
      dispatch({
        type: ActionType.AUTH_SIGN_OUT_FAILURE,
        payload: err,
      });
    });
};
