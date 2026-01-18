import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  getCardsByList,
  createCard,
  deleteCard,
  archiveList,
} from "../../api/apicalls";
import AddCard from "../card/AddCard";
import CardItem from "../card/CardItem";

function ListCard({ list, onListDeleted }) {
  const [cards, setCards] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);


  // get cards
  const fetchCards = () => {
    getCardsByList(list.id).then((res) => {
      setCards(res.data);
    });
  };

  useEffect(() => {
    fetchCards();
  }, [list.id]);


  // add card
  const handleAddCard = (name) => {
    createCard(list.id, name).then(fetchCards);
  };


  // delete card
  const handleDeleteCard = (cardId) => {
    deleteCard(cardId).then(fetchCards);
  };

  // open  dialog
  const handleDeleteClick = () => {
    setConfirmOpen(true);
  };

  // confirm delete
  const handleConfirmDelete = async () => {
    try {
      setDeleting(true);
      await archiveList(list.id);
      if (onListDeleted) onListDeleted(list.id);
    } catch (error) {
      console.error("Error archiving list:", error);
      alert("Failed to archive list. Please try again.");
    } finally {
      setDeleting(false);
      setConfirmOpen(false);
    }
  };

  return (
    <>
      <Card
        sx={{
          width: "100%",
          minWidth: 260,
          maxWidth: 280,
          bgcolor: "#7dd3fc",
          borderRadius: 3,
          boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
          display: "flex",
          flexDirection: "column",
          maxHeight: "calc(100vh - 200px)",
          "@media (max-width:600px)": {
            maxHeight: "calc(100vh - 150px)",
          },
        }}
      >
        <CardHeader
          title={list.name}
          titleTypographyProps={{
            fontWeight: 600,
            fontSize: "14px",
            color: "#fff",
            noWrap: true,
          }}
          action={
            <IconButton onClick={handleDeleteClick} size="small">
              <DeleteIcon fontSize="small" sx={{ color: "#9fadbc" }} />
            </IconButton>
          }
          sx={{ px: 2, pb: 1 }}
        />

        <Box
          sx={{
            px: 2,
            pb: 1,
            flex: 1,
            overflowY: "auto",
            "&::-webkit-scrollbar": { width: 6 },
            "&::-webkit-scrollbar-thumb": {
              background: "rgba(255,255,255,0.3)",
              borderRadius: 3,
            },
          }}
        >
          {cards.map((card) => (
            <CardItem key={card.id} card={card} onDelete={handleDeleteCard} />
          ))}

          <AddCard onAdd={handleAddCard} />
        </Box>
      </Card>

      {/* CONFIRM DELETE DIALOG */}
      <Dialog
        open={confirmOpen}
        onClose={() => !deleting && setConfirmOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Delete List</DialogTitle>

        <DialogContent>
          <Typography>
            Are you sure you want to delete <strong>{list.name}</strong>? This
            action cannot be undone.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} disabled={deleting}>
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={handleConfirmDelete}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ListCard;
