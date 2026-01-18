import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Card,
  CardContent,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function AddNewBoard({ onCreate }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));


  // create board
  const handleCreate = () => {
    if (!name.trim()) return;
    onCreate(name.trim());
    setName("");
    setOpen(false);
  };

  return (
    <>
      {/* CREATE NEW BOARD */}
      <Card
        onClick={() => setOpen(true)}
        sx={{
          width: { xs: "100%", sm: 200 },
          height: 120,
          borderRadius: 2,
          cursor: "pointer",
          background: "linear-gradient(135deg, #7b2ff7, #9f44d3)",
          color: "#fff",
          border: "2px dashed rgba(255,255,255,0.3)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 10px 20px rgba(0,0,0,0.35)",
          },
        }}
      >
        <CardContent
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <AddIcon />
          <Typography fontWeight={600}>Create new board</Typography>
        </CardContent>
      </Card>

      {/* ADD BOARD MODAL */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullScreen={isMobile}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "#1d2125",
            borderRadius: 2,
            border: "1px solid #2c333a",
          },
        }}
      >
        <DialogTitle
          sx={{
            color: "#fff",
            fontWeight: 600,
            borderBottom: "1px solid #2c333a",
          }}
        >
          Create board
        </DialogTitle>

        <DialogContent sx={{ pt: 2 }}>
          <TextField
            autoFocus
            fullWidth
            placeholder="Board name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "#22272b",
                color: "#fff",
              },
              "& fieldset": {
                borderColor: "#445",
              },
              "&:hover fieldset": {
                borderColor: "#7b2ff7",
              },
            }}
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setOpen(false)}
            sx={{ color: "#9fadbc", textTransform: "none" }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleCreate}
            disabled={!name.trim()}
            sx={{
              textTransform: "none",
              bgcolor: "#7b2ff7",
              "&:hover": { bgcolor: "#9f44d3" },
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddNewBoard;
