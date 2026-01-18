// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import boardsReducer from '../features/allBoards/allBoardsSlice';
import boardDetailsReducer from '../features/boardDetails/boardDetailsSlice';
import listsReducer from '../features/boardDetails/lists/listsSlice';
import cardsReducer from '../features/boardDetails/cards/cardsSlice';
import checklistsReducer from '../features/boardDetails/checkLists/checklistsSlice';

const store = configureStore({
  reducer: {
    boards: boardsReducer,
    boardDetails: boardDetailsReducer,
    lists: listsReducer,
    cards: cardsReducer,
    checklists: checklistsReducer,
  },
  // redux-thunk is included by default in Redux Toolkit — no need to add it!
});

export default store;