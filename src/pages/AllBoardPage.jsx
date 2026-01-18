import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography } from "@mui/material";
import {fetchBoards, createNewBoard} from  "../features/allBoards/allBoardsThunks"
import Board from "../components/board/Board";
import AddNewBoard from "../components/board/AddNewBoard";

function BoardsPage() {
  const dispatch = useDispatch();
  const { boards, loading, error } = useSelector(state => state.boards);

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  const handleCreateBoard = async (name) => {
    dispatch(createNewBoard(name));
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#1d2125", p: 3 }}>
        <Typography sx={{ color: "#9fadbc" }}>Loading boards...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#1d2125", p: 3 }}>
        <Typography sx={{ color: "#ff6b6b" }}>{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#1d2125", p: 4 }}>
      <AddNewBoard onCreate={handleCreateBoard} />
      <Box
        sx={{
          mt: 3,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 2,
        }}
      >
        {boards.map((board) => (
          <Board key={board.id} board={board} />
        ))}
      </Box>
    </Box>
  );
}

export default BoardsPage;