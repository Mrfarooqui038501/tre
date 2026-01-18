import api from "./axiosInstance";



// boards

// get all boards
export const getBoards = () => {
  return api.get("/members/me/boards");
};


// get boards by ID 
export const getBoardById = (boardId) => {
  return api.get(`/boards/${boardId}`);
};

// new board

export const createBoard = (name) => {
  return api.post("/boards", null, {
    params: {
      name: name.trim(),
      
    },
  });
};






// lists

// get list
export const getListByBoard = (boardId) => {
  return api.get(`/boards/${boardId}/lists`);
};



// create list
export const createList = (boardId, name) => {
  return api.post("/lists", {
    name,
    idBoard: boardId,
  });
};

// archieve (delete) list
  export const archiveList = (listId) => {
    return api.put(`/lists/${listId}/closed`, null, {
      params: {
        value: true,
      },
    });
  };




// cards

// get cards
export const getCardsByList = (listId) => {
  return api.get(`/lists/${listId}/cards`);
};


// create card

export const createCard = (listId, name) => {
  return api.post("/cards", {
    name,
    idList: listId,
  });
};

// delete card
export const deleteCard = (cardId) => {
  return api.put(`/cards/${cardId}/closed`, null, {
    params: {
      value: true,
    },
  });
};



// Chekclists 

// get checklist in  a card
export const getCheckListByCard = (cardId) =>{
    return api.get(`/cards/${cardId}/checklists`)
}


// Create checklist
export const createChecklist = (cardId, name) => {
  return api.post("/checklists", {
    name,
    idCard: cardId,
  });
};


// Delete checklist
export const deleteChecklist = (checklistId) => {
  return api.delete(`/checklists/${checklistId}`);
};


// CHECKITEM APIs

// Create checkitem
export const createCheckItem = (checklistId, name) => {
  return api.post(`/checklists/${checklistId}/checkItems`, {
    name,
  });
};


// Delete checkitem
export const deleteCheckItem = (checklistId, checkItemId) => {
  return api.delete(
    `/checklists/${checklistId}/checkItems/${checkItemId}`
  );
};


// Check -  uncheck checkitem
export const toggleCheckItem = (cardId, checkItemId, state) => {
  return api.put(
    `/cards/${cardId}/checkItem/${checkItemId}`,
    {
      state, 
    }
  );
};
