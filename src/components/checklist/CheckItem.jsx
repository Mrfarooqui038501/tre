import { useState } from "react";
import {
  Box,
  Checkbox,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { toggleCheckItem, deleteCheckItem } from "../../api/apicalls";

function ChecklistItem({ item, checklistId, cardId, onDelete, onToggle }) {
  const [checked, setChecked] = useState(item.state === "complete");
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [error, setError] = useState("");


  // handle toggle 
  const handleToggle = async () => {
    const newState = checked ? "incomplete" : "complete";
    const prevState = checked;

    setChecked(!checked);

    try {
      await toggleCheckItem(cardId, item.id, newState);
      if (onToggle) onToggle();
    } catch {
      setChecked(prevState);
      setError("Failed to update item. Please try again.");
    }
  };


  // handle delete 
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setConfirmOpen(true);
  };


  //confirm delete 
  const handleConfirmDelete = async () => {
    setIsDeleting(true);

    try {
      await deleteCheckItem(checklistId, item.id);
      if (onDelete) onDelete();
      setConfirmOpen(false);
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
          alignItems: "center",
          gap: 1,
          mb: 1,
          p: 1,
          bgcolor: "#fff",
          borderRadius: 1,
          opacity: isDeleting ? 0.5 : 1,
          "&:hover": {
            bgcolor: "#f8f9fa",
          },
        }}
      >
        <Checkbox
          checked={checked}
          onChange={handleToggle}
          size="small"
          disabled={isDeleting}
        />

        <Typography
          sx={{
            flex: 1,
            textDecoration: checked ? "line-through" : "none",
            color: checked ? "text.secondary" : "text.primary",
          }}
        >
          {item.name}
        </Typography>

        <IconButton
          size="small"
          onClick={handleDeleteClick}
          disabled={isDeleting}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* DELETE CONFIRMATION DIALOG */}
      <Dialog
        open={confirmOpen}
        onClose={() => !isDeleting && setConfirmOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Delete Item</DialogTitle>

        <DialogContent>
          <Typography>
            Are you sure you want to delete{" "}
            <strong>{item.name}</strong>?
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setConfirmOpen(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleConfirmDelete}
            disabled={isDeleting}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

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

export default ChecklistItem;
