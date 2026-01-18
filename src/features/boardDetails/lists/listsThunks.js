import { getListByBoard, createList, archiveList } from '../../../api/apicalls';
import * as types from '../../../app/actionTypes';

export const fetchLists = (boardId) => async (dispatch) => {
  dispatch({ type: types.FETCH_LISTS_REQUEST });
  try {
    const response = await getListByBoard(boardId);
    dispatch({ type: types.FETCH_LISTS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.FETCH_LISTS_FAILURE, payload: error.message });
  }
};

export const createNewList = (boardId, name) => async (dispatch) => {
  dispatch({ type: types.CREATE_LIST_REQUEST });
  try {
    const response = await createList(boardId, name);
    dispatch({ type: types.CREATE_LIST_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.CREATE_LIST_FAILURE, payload: error.message });
  }
};

export const archiveListById = (listId) => async (dispatch) => {
  dispatch({ type: types.ARCHIVE_LIST_REQUEST });
  try {
    await archiveList(listId);
    dispatch({ type: types.ARCHIVE_LIST_SUCCESS, payload: listId });
  } catch (error) {
    dispatch({ type: types.ARCHIVE_LIST_FAILURE, payload: error.message });
  }
};