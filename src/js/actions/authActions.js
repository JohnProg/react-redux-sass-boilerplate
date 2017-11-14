import { HttpClient } from '../utils';
import * as types from '../constants/actionTypes';

export default function logIn(data) {
  return dispatch => HttpClient.post(data, dispatch, types.LOGIN, 'login');
}
