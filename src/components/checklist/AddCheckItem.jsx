import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { createCheckItem } from "../../api/apicalls";

function AddCheckitem({ checklistId, onAdd }) {
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");


  // adding item
  const handleAdd = async () => {
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      await createCheckItem(checklistId, name);
      setName("");
      if (onAdd) onAdd();
    } catch {
      setError("Failed to create item. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };


  // cancel checklist 

  const handleCancel = () => {
    setName("");
    setIsAdding(false);
  };



  // key down  function 
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAdd();
    }
    if (e.key === "Escape") {
      handleCancel();
    }
  };

  if (!isAdding) {
    return (
      <Button
        size="small"
        onClick={() => setIsAdding(true)}
        sx={{
          mt: 1,
          textTransform: "none",
          color: "text.secondary",
          fontSize: "14px",
          fontWeight: 400,
          bgcolor: "#091e420a",
          "&:hover": {
            bgcolor: "#091e4214",
          },
        }}
      >
        Add an item
      </Button>
    );
  }

  return (
    <>
      <Box sx={{ mt: 1 }}>
        <TextField
          autoFocus
          fullWidth
          placeholder="Add an item"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          size="small"
          disabled={isSubmitting}
          multiline
          maxRows={4}
          sx={{
            mb: 1,
            "& .MuiOutlinedInput-root": {
              bgcolor: "#fff",
            },
          }}
        />

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            size="small"
            onClick={handleAdd}
            disabled={!name.trim() || isSubmitting}
            sx={{
              textTransform: "none",
              bgcolor: "#0079bf",
              "&:hover": {
                bgcolor: "#026aa7",
              },
            }}
          >
            Add
          </Button>

          <Button
            size="small"
            onClick={handleCancel}
            disabled={isSubmitting}
            sx={{ textTransform: "none" }}
          >
            Cancel
          </Button>
        </Box>
      </Box>

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

export default AddCheckitem;
