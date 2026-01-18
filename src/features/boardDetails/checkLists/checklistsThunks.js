import { getCheckListByCard, createChecklist, deleteChecklist } from '../../../api/apicalls';
import * as types from '../../../app/actionTypes';

export const fetchChecklists = (cardId) => async (dispatch) => {
  dispatch({ type: types.FETCH_CHECKLISTS_REQUEST });
  try {
    const response = await getCheckListByCard(cardId);
    dispatch({ type: types.FETCH_CHECKLISTS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.FETCH_CHECKLISTS_FAILURE, payload: error.message });
  }
};

export const createNewChecklist = (cardId, name) => async (dispatch) => {
  dispatch({ type: types.CREATE_CHECKLIST_REQUEST });
  try {
    const response = await createChecklist(cardId, name);
    dispatch({ type: types.CREATE_CHECKLIST_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.CREATE_CHECKLIST_FAILURE, payload: error.message });
  }
};

export const deleteChecklistById = (checklistId) => async (dispatch) => {
  dispatch({ type: types.DELETE_CHECKLIST_REQUEST });
  try {
    await deleteChecklist(checklistId);
    dispatch({ type: types.DELETE_CHECKLIST_SUCCESS, payload: checklistId });
  } catch (error) {
    dispatch({ type: types.DELETE_CHECKLIST_FAILURE, payload: error.message });
  }
};