import * as types from '../../../app/actionTypes';

const initialState = {
  checklists: [],
  loading: false,
  error: null,
};

const checklistsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_CHECKLISTS_REQUEST:
    case types.CREATE_CHECKLIST_REQUEST:
    case types.DELETE_CHECKLIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    
    case types.FETCH_CHECKLISTS_SUCCESS:
      return {
        ...state,
        loading: false,
        checklists: action.payload,
        error: null,
      };
    
    case types.CREATE_CHECKLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        checklists: [...state.checklists, action.payload],
        error: null,
      };
    
    case types.DELETE_CHECKLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        checklists: state.checklists.filter(checklist => checklist.id !== action.payload),
        error: null,
      };
    
    case types.FETCH_CHECKLISTS_FAILURE:
    case types.CREATE_CHECKLIST_FAILURE:
    case types.DELETE_CHECKLIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    
    default:
      return state;
  }
};

export default checklistsReducer;