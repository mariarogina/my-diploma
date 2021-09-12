import {
  CHANGE_SEARCH_FIELD,
  IS_SEARCHING
} from '../actions/actionTypes'

const initialState = {
  searchString: '',
  isSearching: false
};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SEARCH_FIELD:
      const {searchString} = action.payload;
      return {
        ...state,
        searchString
      };
    case IS_SEARCHING:
      return {
        ...state,
        isSearching: !state.isSearching
      };
    default:
      return state;
  }
}