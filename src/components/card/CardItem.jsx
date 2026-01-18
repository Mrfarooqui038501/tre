import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CardModal from "../card/CardModal"

function CardItem({ card, onDelete }) {
  const [openModal, setOpenModal] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);


  // delete items from card 
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setConfirmOpen(true);
  };


  // cofrim delete item 
  const handleConfirmDelete = () => {
    setDeleting(true);
    onDelete(card.id);
    setConfirmOpen(false);
    setDeleting(false);
  };

  return (
    <>
      <Card
        sx={{
          mb: 1,
          cursor: "pointer",
          borderRadius: 2,
          width: "100%",
          minWidth: 0,
          "&:hover": {
            bgcolor: "#f4f5f7",
          },
        }}
        onClick={() => setOpenModal(true)}
      >
        <CardContent
          sx={{
            p: 1.5,
            "&:last-child": { pb: 1.5 },
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 1,
              width: "100%",
              minWidth: 0,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                flex: 1,
                minWidth: 0,
                wordBreak: "break-word",
                overflowWrap: "break-word",
                hyphens: "auto",
                fontSize: "14px",
                lineHeight: 1.5,
                pr: 1,
              }}
            >
              {card.name}
            </Typography>

            <IconButton
              size="small"
              onClick={handleDeleteClick}
              sx={{
                ml: 0,
                flexShrink: 0,
                p: 0.5,
                mt: -0.5,
                "&:hover": {
                  bgcolor: "rgba(0,0,0,0.04)",
                },
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </CardContent>
      </Card>

      {/* CARD DETAILS MODAL */}
      <CardModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        card={card}
      />

      {/* DELETE CONFIRMATION DIALOG */}
      <Dialog
        open={confirmOpen}
        onClose={() => !deleting && setConfirmOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Delete Card</DialogTitle>

        <DialogContent>
          <Typography>
            Are you sure you want to delete{" "}
            <strong>{card.name}</strong>?
            <br />
            This action cannot be undone.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setConfirmOpen(false)}
            disabled={deleting}
          >
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={handleConfirmDelete}
            disabled={deleting}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CardItem;
