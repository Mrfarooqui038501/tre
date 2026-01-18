import { Box } from "@mui/material";
import ListCard from "../list/ListCard";
import AddList from "../list/AddList";



function BoardList({ lists, onListDeleted, onListAdded }) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        overflowX: "auto",
        overflowY: "hidden",
        pb: 2,
        width: "100%",
        minHeight: "calc(100vh - 200px)",
        alignItems: "flex-start",
        "&::-webkit-scrollbar": {
          height: "8px",
        },
        "&::-webkit-scrollbar-track": {
          background: "rgba(0,0,0,0.1)",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "rgba(255,255,255,0.3)",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "rgba(255,255,255,0.5)",
        },
        "@media (max-width: 600px)": {
          gap: 1,
          pb: 1,
        },
      }}
    >
      {lists.map((list) => (
        <Box
          key={list.id}
          sx={{
            flexShrink: 0,
            width: { xs: "260px", sm: "280px" },
            maxWidth: "100vw",
          }}
        >
          <ListCard list={list} onListDeleted={onListDeleted} />
        </Box>
      ))}

      <Box
        sx={{
          flexShrink: 0,
          width: { xs: "260px", sm: "auto" },
        }}
      >
        <AddList onAdd={onListAdded} />
      </Box>
    </Box>
  );
}

export default BoardList;
