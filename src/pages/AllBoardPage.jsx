import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { getBoards, createBoard } from "../api/apicalls";
import Board from "../components/board/Board";
import AddNewBoard from "../components/board/AddNewBoard";

function BoardsPage() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // fetch all boards 
  const fetchBoards = async () => {
    try {
      setLoading(true);
      const res = await getBoards();
      setBoards(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to load boards. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);


  // handle create board
  const handleCreateBoard = async (name) => {
    try {
      await createBoard(name);
      await fetchBoards();
    } catch (err) {
      setError("Failed to create board. Please try again.");
    }
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
