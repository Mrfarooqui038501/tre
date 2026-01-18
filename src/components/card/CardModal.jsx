import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
  Divider,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { getCheckListByCard } from "../../api/apicalls";
import Checklist  from "../checklist/Checklist";
import AddChecklist from "../checklist/AddChecklist"


function CardModal({ open, onClose, card }) {
  const [checklists, setChecklists] = useState([]);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));



  // cehcklist 
  const fetchChecklists = () => {
    if (card?.id) {
      setLoading(true);
      getCheckListByCard(card.id)
        .then((res) => {
          setChecklists(res.data);
        })
        .catch((err) => {
          console.error("Error fetching checklists:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  // fetch checklist 
  useEffect(() => {
    if (open && card) {
      fetchChecklists();
    }
  }, [open, card]);


  // adding checklist 
  const handleChecklistAdded = () => {
    fetchChecklists();
  };

  // delete checklist 
  const handleChecklistDeleted = () => {
    fetchChecklists();
  };


  //  checlist updated 
  const handleChecklistUpdated = () => {
    fetchChecklists();
  };

  if (!card) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          minHeight: { xs: "100vh", sm: "60vh" },
          m: { xs: 0, sm: 2 },
          borderRadius: { xs: 0, sm: 2 },
        },
      }}
    >
      <DialogTitle
        sx={{
          pt: { xs: 2, sm: 3 },
          px: { xs: 2, sm: 3 },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <CreditCardIcon fontSize={isMobile ? "small" : "medium"} />
          <Typography
            variant="h6"
            sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
          >
            {card.name}
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
          size={isMobile ? "small" : "medium"}
        >
          <CloseIcon fontSize={isMobile ? "small" : "medium"} />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          px: { xs: 2, sm: 3 },
          py: { xs: 2, sm: 2 },
        }}
      >
        {card.desc && (
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              mb={1}
              sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
            >
              Description
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
            >
              {card.desc}
            </Typography>
          </Box>
        )}

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 3 }}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            mb={2}
            sx={{ fontSize: { xs: "1rem", sm: "1.125rem" } }}
          >
            Checklists
          </Typography>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
              <CircularProgress size={isMobile ? 32 : 40} />
            </Box>
          ) : (
            <>
              {checklists.length > 0 ? (
                checklists.map((checklist) => (
                  <Checklist
                    key={checklist.id}
                    checklist={checklist}
                    cardId={card.id}
                    onDelete={handleChecklistDeleted}
                    onUpdate={handleChecklistUpdated}
                  />
                ))
              ) : (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                  }}
                >
                  No checklists yet. Add one to get started!
                </Typography>
              )}

              <AddChecklist cardId={card.id} onAdd={handleChecklistAdded} />
            </>
          )}
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          px: { xs: 2, sm: 3 },
          pb: { xs: 2, sm: 2 },
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          size={isMobile ? "small" : "medium"}
          sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CardModal;
