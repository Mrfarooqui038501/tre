import * as types from '../../app/actionTypes';

const initialState = {
  currentBoard: null,
  loading: false,
  error: null,
};

const boardDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_BOARD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    
    case types.FETCH_BOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        currentBoard: action.payload,
        error: null,
      };
    
    case types.FETCH_BOARD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    
    default:
      return state;
  }
};

export default boardDetailsReducer;