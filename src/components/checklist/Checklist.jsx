import { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import { deleteChecklist } from "../../api/apicalls";
import ChecklistItem from "./ChecklistItem";
import AddCheckitem from "./AddCheckItem";

function Checklist({ checklist, cardId, onDelete, onUpdate }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");


  // delete 
  const handleDeleteClick = () => {
    setConfirmOpen(true);
  };

  // confirm delete 
  const handleConfirmDelete = () => {
    setIsDeleting(true);

    deleteChecklist(checklist.id)
      .then(() => {
        if (onDelete) onDelete();
        setConfirmOpen(false);
      })
      .catch(() => {
        setError("Failed to delete checklist. Please try again.");
        setIsDeleting(false);
      });
  };


  // change item
  const handleItemChange = () => {
    if (onUpdate) onUpdate();
  };

  return (
    <>
      <Box sx={{ mb: 3 }}>
        {/* Checklist Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1.5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CheckBoxOutlinedIcon sx={{ fontSize: 20 }} />
            <Typography variant="subtitle1" fontWeight="600" fontSize="16px">
              {checklist.name}
            </Typography>
          </Box>

          <IconButton size="small" onClick={handleDeleteClick}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Checklist Items */}
        <Box sx={{ mb: 1 }}>
          {checklist.checkItems?.map((item) => (
            <ChecklistItem
              key={item.id}
              item={item}
              checklistId={checklist.id}
              cardId={cardId}
              onDelete={handleItemChange}
            />
          ))}

          <AddCheckitem checklistId={checklist.id} onAdd={handleItemChange} />
        </Box>
      </Box>

      {/* CONFIRM DELETE DIALOG */}
      <Dialog
        open={confirmOpen}
        onClose={() => !isDeleting && setConfirmOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Delete Checklist</DialogTitle>

        <DialogContent>
          <Typography>
            Are you sure you want to delete{" "}
            <strong>{checklist.name}</strong>?
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

export default Checklist;
