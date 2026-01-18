import * as types from '../../../app/actionTypes';

const initialState = {
  lists: [],
  loading: false,
  error: null,
};

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_LISTS_REQUEST:
    case types.CREATE_LIST_REQUEST:
    case types.ARCHIVE_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    
    case types.FETCH_LISTS_SUCCESS:
      return {
        ...state,
        loading: false,
        lists: action.payload,
        error: null,
      };
    
    case types.CREATE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        lists: [...state.lists, action.payload],
        error: null,
      };
    
    case types.ARCHIVE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        lists: state.lists.filter(list => list.id !== action.payload),
        error: null,
      };
    
    case types.FETCH_LISTS_FAILURE:
    case types.CREATE_LIST_FAILURE:
    case types.ARCHIVE_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    
    default:
      return state;
  }
};

export default listsReducer;