import { getBoardById } from '../../api/apicalls';
import * as types from '../../app/actionTypes';

export const fetchBoardById = (boardId) => async (dispatch) => {
  dispatch({ type: types.FETCH_BOARD_REQUEST });
  try {
    const response = await getBoardById(boardId);
    dispatch({ type: types.FETCH_BOARD_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.FETCH_BOARD_FAILURE, payload: error.message });
  }
};