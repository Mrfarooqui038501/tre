import { useState } from "react";
import {
  Box,
  Checkbox,
  Typography,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { toggleCheckItem, deleteCheckItem } from "../../api/apicalls";

function ChecklistItem({ item, checklistId, cardId, onDelete, onToggle }) {
  const [checked, setChecked] = useState(item.state === "complete");
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");


  // toggle 
  const handleToggle = async (e) => {
    e.stopPropagation();

    const newState = checked ? "incomplete" : "complete";
    const previousState = checked;

    setChecked(!checked);

    try {
      await toggleCheckItem(cardId, item.id, newState);
      if (onToggle) onToggle();
    } catch {
      
      setChecked(previousState);
      setError("Failed to update item. Please try again.");
    }
  };

  // delete 
  const handleDelete = async (e) => {
    e.stopPropagation();

    setIsDeleting(true);

    try {
      await deleteCheckItem(checklistId, item.id);
      if (onDelete) onDelete();
    } catch {
      setError("Failed to delete item. Please try again.");
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 1,
          mb: 0.5,
          p: 1,
          borderRadius: 1,
          opacity: isDeleting ? 0.5 : 1,
          transition: "background-color 0.2s",
          "&:hover": {
            bgcolor: "rgba(0,0,0,0.04)",
            "& .delete-icon": {
              opacity: 1,
            },
          },
        }}
      >
        <Checkbox
          checked={checked}
          onChange={handleToggle}
          size="small"
          disabled={isDeleting}
          sx={{
            p: 0.5,
            "&.Mui-checked": {
              color: "#0079bf",
            },
          }}
        />

        <Typography
          sx={{
            flex: 1,
            fontSize: "14px",
            lineHeight: "20px",
            pt: 0.5,
            textDecoration: checked ? "line-through" : "none",
            color: checked ? "text.secondary" : "text.primary",
            wordBreak: "break-word",
          }}
        >
          {item.name}
        </Typography>

        <IconButton
          className="delete-icon"
          size="small"
          onClick={handleDelete}
          disabled={isDeleting}
          sx={{
            p: 0.5,
            opacity: 0,
            transition: "opacity 0.2s",
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>

      
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

export default ChecklistItem;
