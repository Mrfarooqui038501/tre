import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

function AddCard({ onAdd }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");


  // handle add card
  const handleAdd = () => {
    if (!name.trim()) return;
    onAdd(name);
    setName("");
    setOpen(false);
  };


  // key down (enter)
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  if (!open) {
    return (
      <Box
        sx={{ color: "#5e6c84", cursor: "pointer", mt: 1 }}
        onClick={() => setOpen(true)}
      >
        + Add a card
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 1 }}>
      <TextField
        autoFocus
        fullWidth
        size="small"
        placeholder="Enter a title"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
        <Button size="small" variant="contained" onClick={handleAdd}>
          Add
        </Button>
        <Button size="small" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
}

export default AddCard;
