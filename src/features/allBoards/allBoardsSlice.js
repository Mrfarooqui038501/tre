import * as types from '../../app/actionTypes';

const initialState = {
  boards: [],
  loading: false,
  error: null,
};

const boardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_BOARDS_REQUEST:
    case types.CREATE_BOARD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    
    case types.FETCH_BOARDS_SUCCESS:
      return {
        ...state,
        loading: false,
        boards: action.payload,
        error: null,
      };
    
    case types.CREATE_BOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        boards: [...state.boards, action.payload],
        error: null,
      };
    
    case types.FETCH_BOARDS_FAILURE:
    case types.CREATE_BOARD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    
    default:
      return state;
  }
};

export default boardsReducer;