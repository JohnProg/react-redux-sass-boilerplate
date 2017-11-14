import * as types from './../constants/actionTypes';

const initialState = {
  items: [],
  isFetching: false,
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case `${types.FETCH_USERS}_PENDING`:
      return { ...state, isFetching: true };
    case `${types.FETCH_USERS}_REJECTED`:
      return { ...state, isFetching: false, error: action.payload };
    case `${types.FETCH_USERS}_FULFILLED`:
      return {
        ...state,
        isFetching: false,
        items: action.payload.data,
      };
    default:
      return state;
  }
}
