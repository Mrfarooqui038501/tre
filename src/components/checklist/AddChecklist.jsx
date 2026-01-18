import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Card,
  Snackbar,
  Alert,
} from "@mui/material";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import { createChecklist } from "../../api/apicalls";

function AddChecklist({ cardId, onAdd }) {
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");


  // adding checklist 
  const handleAdd = async () => {
    if (!name.trim()) return;

    try {
      await createChecklist(cardId, name);
      setName("");
      setIsAdding(false);
      if (onAdd) onAdd();
    } catch {
      setError("Failed to create checklist. Please try again.");
    }
  };


  // cancel button
  const handleCancel = () => {
    setName("");
    setIsAdding(false);
  };

  if (!isAdding) {
    return (
      <Button
        startIcon={<CheckBoxOutlinedIcon />}
        onClick={() => setIsAdding(true)}
        sx={{ mt: 1, textTransform: "none" }}
      >
        Add Checklist
      </Button>
    );
  }

  return (
    <>
      <Card sx={{ p: 2, mt: 1, bgcolor: "#f4f5f7" }}>
        <TextField
          autoFocus
          fullWidth
          placeholder="Checklist title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          size="small"
          sx={{ mb: 1, bgcolor: "#fff" }}
        />

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            size="small"
            onClick={handleAdd}
            disabled={!name.trim()}
          >
            Add
          </Button>
          <Button size="small" onClick={handleCancel}>
            Cancel
          </Button>
        </Box>
      </Card>

      {/* ERROR SNACKBAR */}
      <Snackbar
        open={Boolean(error)}
        autoHideDuration={4000}
        onClose={() => setError("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="error"
          onClose={() => setError("")}
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}

export default AddChecklist;
