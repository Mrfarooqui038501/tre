import * as types from '../../../app/actionTypes';

const initialState = {
  cardsByList: {},
  loading: false,
  error: null,
};

const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_CARDS_REQUEST:
    case types.CREATE_CARD_REQUEST:
    case types.DELETE_CARD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    
    case types.FETCH_CARDS_SUCCESS:
      return {
        ...state,
        loading: false,
        cardsByList: {
          ...state.cardsByList,
          [action.payload.listId]: action.payload.cards,
        },
        error: null,
      };
    
    case types.CREATE_CARD_SUCCESS:
      return {
        ...state,
        loading: false,
        cardsByList: {
          ...state.cardsByList,
          [action.payload.listId]: [
            ...(state.cardsByList[action.payload.listId] || []),
            action.payload.card,
          ],
        },
        error: null,
      };
    
    case types.DELETE_CARD_SUCCESS:
      return {
        ...state,
        loading: false,
        cardsByList: {
          ...state.cardsByList,
          [action.payload.listId]: state.cardsByList[action.payload.listId]?.filter(
            card => card.id !== action.payload.cardId
          ) || [],
        },
        error: null,
      };
    
    case types.FETCH_CARDS_FAILURE:
    case types.CREATE_CARD_FAILURE:
    case types.DELETE_CARD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    
    default:
      return state;
  }
};

export default cardsReducer;