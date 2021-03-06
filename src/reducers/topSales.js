import {
  FETCH_TOPSALES_REQUEST,
  FETCH_TOPSALES_FAILURE,
  FETCH_TOPSALES_SUCCESS
} from '../actions/actionTypes'

import urls from '../constants';
import {take, put} from 'redux-saga/effects'

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export default function topSalesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TOPSALES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_TOPSALES_FAILURE:
      const error = action.payload;
      return {
        ...state,
        loading: false,
        error,
      };
    case FETCH_TOPSALES_SUCCESS:
      const items = action.payload;
      return {
        ...state,
        items,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
}

export const fetchTopSalesSaga = function* () {
  while(true) {
    yield take(FETCH_TOPSALES_REQUEST)
    try {
      const response = yield fetch(urls.topSales, {
        mode: 'cors',
      });
  
      if (!response.ok) {
        throw new Error(response.statusText);
      }
  
      const data = yield response.json();
 

      yield put({
        type: FETCH_TOPSALES_SUCCESS,
        payload: data
      })

    } catch (error) {
      yield put({
        type: FETCH_TOPSALES_FAILURE,
        payload: error.message
      })
    }
  }
}

