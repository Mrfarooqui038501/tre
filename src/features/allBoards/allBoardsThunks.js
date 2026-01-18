import { getBoards, createBoard } from '../../api/apicalls';
import * as types from '../../app/actionTypes';

export const fetchBoards = () => async (dispatch) => {
  dispatch({ type: types.FETCH_BOARDS_REQUEST });
  try {
    const response = await getBoards();
    dispatch({ type: types.FETCH_BOARDS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.FETCH_BOARDS_FAILURE, payload: error.message });
  }
};

export const createNewBoard = (name) => async (dispatch) => {
  dispatch({ type: types.CREATE_BOARD_REQUEST });
  try {
    const response = await createBoard(name);
    dispatch({ type: types.CREATE_BOARD_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.CREATE_BOARD_FAILURE, payload: error.message });
  }
};