import axios from 'axios';
import API_URL from './../constants/config';

const getHeaders = () => ({
  Authorization: `Token ${window.sessionStorage.getItem('token')}`,
});

export default class HttpClient {
  static get(dispatch, type, url) {
    return dispatch({
      type,
      payload: axios.get(`${API_URL}${url}`, { headers: getHeaders() }),
    });
  }

  static delete(dispatch, type, url) {
    return dispatch({
      type,
      payload: axios.delete(`${API_URL}${url}`, { headers: getHeaders() }),
    });
  }

  static post(data, dispatch, type, url) {
    return dispatch({
      type,
      payload: axios.post(`${API_URL}${url}`, data, { headers: getHeaders() }),
    });
  }

  static patch(data, dispatch, type, url) {
    return dispatch({
      type,
      payload: axios.patch(`${API_URL}${url}`, data, { headers: getHeaders() }),
    });
  }
}
