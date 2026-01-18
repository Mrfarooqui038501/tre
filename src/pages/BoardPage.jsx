import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { fetchBoardById } from "../features/boardDetails/boardDetailsThunks";
import {
  fetchLists,
  createNewList,
} from "../features/boardDetails/lists/listsThunks";

import BoardList from "../components/board/BoardList";

function BoardPage() {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    currentBoard: board,
    loading: boardLoading,
    error: boardError,
  } = useSelector((state) => state.boardDetails);
  const {
    lists,
    loading: listsLoading,
    error: listsError,
  } = useSelector((state) => state.lists);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (boardId) {
      dispatch(fetchBoardById(boardId));
      dispatch(fetchLists(boardId));
    }
  }, [dispatch, boardId]);

  const handleListDeleted = () => {
    dispatch(fetchLists(boardId));
  };

  const handleListAdded = (name) => {
    dispatch(createNewList(boardId, name));
  };

  if (boardLoading || listsLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 64px)",
          bgcolor: "#1d2125",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (boardError || listsError) {
    return (
      <Box
        sx={{
          p: { xs: 2, sm: 4 },
          bgcolor: "#1d2125",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <Typography color="error">{boardError || listsError}</Typography>
      </Box>
    );
  }

  if (!board) {
    return (
      <Box
        sx={{
          p: { xs: 2, sm: 4 },
          bgcolor: "#1d2125",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <Typography sx={{ color: "#fff" }}>Board not found</Typography>
      </Box>
    );
  }

  const backgroundImage =
    board.prefs?.backgroundImageScaled?.[2]?.url ||
    board.prefs?.backgroundImage;

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: 1, sm: 2 },
          p: { xs: 1, sm: 2, md: 3 },
          flexWrap: "wrap",
          flexShrink: 0,
        }}
      >
        <IconButton
          onClick={() => navigate("/boards")}
          sx={{
            color: "#fff",
            bgcolor: "rgba(0,0,0,0.2)",
            "&:hover": { bgcolor: "rgba(0,0,0,0.4)" },
            flexShrink: 0,
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        <Box
          sx={{
            px: { xs: 2, sm: 3 },
            py: { xs: 0.5, sm: 1 },
            borderRadius: { xs: 2, sm: 4 },
            background: "linear-gradient(135deg, #ff00cc 0%, #333399 100%)",
            boxShadow: "0 4px 20px -5px rgba(255,0,204,.6)",
            backdropFilter: "blur(10px)",
            maxWidth: { xs: "calc(100% - 60px)", sm: "auto" },
          }}
        >
          <Typography
            variant={{ xs: "subtitle1", sm: "h5" }}
            sx={{
              color: "#fff",
              fontWeight: 800,
              letterSpacing: "0.5px",
              textShadow: "0 1px 3px rgba(0,0,0,.4)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {board.name}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          minHeight: 0,
          width: "100%",
          overflow: "hidden",
        }}
      >
        <BoardList
          lists={lists}
          onListDeleted={handleListDeleted}
          onListAdded={handleListAdded}
        />
      </Box>
    </Box>
  );
}

export default BoardPage;
