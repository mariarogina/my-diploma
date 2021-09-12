
import {
  FETCH_ITEM_REQUEST,
  FETCH_ITEM_FAILURE,
  FETCH_ITEM_SUCCESS,
  SET_AVALIBLE_SIZES,
  SET_QUANTITY,
  SET_SIZE,
} from "../actions/actionTypes";

import urls from '../constants';
import {take, put} from 'redux-saga/effects'

const initialState = {
  item: null,
  avalibleSizes: [],
  loading: false,
  error: null,
  quantity: 1,
  size: null,
};



export default function catalogItemReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ITEM_REQUEST:
      return {
        ...initialState,
        loading: true,
      };
    case FETCH_ITEM_FAILURE:
      const { error } = action.payload;
      return {
        ...state,
        loading: false,
        error,
      };
    case FETCH_ITEM_SUCCESS:
      const { item } = action.payload;
      return {
        ...state,
        item,
        loading: false,
        error: null,
      };
    case SET_AVALIBLE_SIZES:
      const { sizes } = action.payload;
      return {
        ...state,
        avalibleSizes: sizes,
        loading: false,
        error: null,
      };
    case SET_QUANTITY:
      const { quantity } = action.payload;
      return {
        ...state,
        quantity,
      };
    case SET_SIZE:
      const { size } = action.payload;
      return {
        ...state,
        size,
      };
    default:
      return state;
  }
}

export const fetchItemSaga = function* (id) {
  while (true) {
    yield take(FETCH_ITEM_REQUEST);
    
    try {
      const response = yield fetch(`${urls.items}/${id}`, {
        mode: "cors",
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = yield response.json();
      const filteredSizes = data.sizes.filter((item) => item.avalible);
      console.log(data)

      yield put({
        type: FETCH_ITEM_SUCCESS,
        payload: data,
      }, {
        type: SET_AVALIBLE_SIZES,
        payload: filteredSizes,
      });

    } catch (error) {
      yield put({
        type: FETCH_ITEM_FAILURE,
        payload: error.message,
      });
    }
  }
};
