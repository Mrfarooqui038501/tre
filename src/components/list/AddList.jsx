import { useState } from "react";
import { Box, TextField, Button, Card } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function AddList({ onAdd }) {
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState("");



  // add list 
  const handleAdd = () => {
    if (!name.trim()) return;
    onAdd(name);
    setName("");
    setIsAdding(false);
  };

  const handleCancel = () => {
    setName("");
    setIsAdding(false);
  };

  if (!isAdding) {
    return (
      <Box
        onClick={() => setIsAdding(true)}
        sx={{
          width: 280,
          minWidth: 280,
          height: "fit-content",
          bgcolor: "rgba(255,255,255,0.24)",
          borderRadius: 3,
          p: 1.5,
          cursor: "pointer",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          gap: 1,
          flexShrink: 0,
          transition: "all 0.2s",
          "&:hover": {
            bgcolor: "rgba(255,255,255,0.32)",
          },
        }}
      >
        <AddIcon />
        Add another list
      </Box>
    );
  }

  return (
    <Card 
      sx={{ 
        width: 280, 
        minWidth: 280,
        p: 1.5, 
        bgcolor: "#fff",
        borderRadius: 3,
        flexShrink: 0,
      }}
    >
      <TextField
        autoFocus
        fullWidth
        placeholder="Enter list title..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleAdd();
          }
        }}
        size="small"
        sx={{ 
          mb: 1,
          "& .MuiInputBase-input": {
            color: "#172b4d",
          },
          "& .MuiInputBase-input::placeholder": {
            color: "#5e6c84",
            opacity: 1,
          },
        }}
      />
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button
          variant="contained"
          size="small"
          onClick={handleAdd}
          disabled={!name.trim()}
        >
          Add list
        </Button>
        <Button size="small" onClick={handleCancel}>
          Cancel
        </Button>
      </Box>
    </Card>
  );
}

export default AddList;