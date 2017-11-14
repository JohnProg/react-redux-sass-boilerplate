import { HttpClient } from '../utils';
import * as types from '../constants/actionTypes';

export function fetchUsers() {
  return dispatch => HttpClient.get(dispatch, types.FETCH_USERS, 'users');
}

export function fetchUser(id) {
  return dispatch => HttpClient.get(dispatch, types.FETCH_USER, `user/${id}`);
}
