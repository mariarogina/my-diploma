import {
  SET_CART_TOTAL,
  GET_CART_ITEMS_SUCCESS,
  FETCH_ORDER_REQUEST,
  FETCH_ORDER_FAILURE,
  FETCH_ORDER_SUCCESS,
  CHANGE_FORM_FIELD
} from '../actions/actionTypes'

const initialState = {
  cartItems: null,
  totalSum: null,
  loading: false,
  error: null,
  owner: {phone: '', address: ''},
  success: false
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {

    case GET_CART_ITEMS_SUCCESS:
      const {cartItems} = action.payload;
      return {
        ...state,
        cartItems,
        success: false
      };
    case CHANGE_FORM_FIELD:
        const { name, value } = action.payload;
        const {owner} = state;
        return {
          ...state,
          owner: {
            ...owner,
            [name]: value,
          }
        };
    case FETCH_ORDER_REQUEST:
    return {
      ...state,
      loading: true,
      error: null
    };
    case FETCH_ORDER_FAILURE:
    const {error} = action.payload;
    return {
      ...state,
      error,
      loading: false
    };
    case FETCH_ORDER_SUCCESS:
    return {
      ...initialState,
      success: true
    };
    case SET_CART_TOTAL:
        const {total} = action.payload;
      return {
        ...state,
        totalSum: total
      };
    default:
      return state;
  }
}