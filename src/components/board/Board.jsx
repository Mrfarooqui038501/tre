import { useState } from "react";
import { Card, CardContent, Typography, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Board({ board}) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);


  // handle close 
  const handleClose = () => {
    setAnchorEl(null);
  };


  // handle boardclick 
  const handleBoardClick = () => {
    navigate(`/boards/${board.id}`);
  };


  // background image
  const image =
    board.prefs?.backgroundImageScaled?.[2]?.url ||
    board.prefs?.backgroundImage;

  return (
    <>
      <Card
        onClick={handleBoardClick}
        sx={{
          width: "100%",
          height: { xs: 100, sm: 110, md: 120 },
          position: "relative",
          backgroundImage: image
            ? `linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.15)), url(${image})`
            : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          cursor: "pointer",
          transition: "all 0.2s ease",
          borderRadius: 2,
          "&:hover": {
            transform: { xs: "translateY(-2px)", sm: "translateY(-4px)" },
            boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
          },
        }}
      >
        <CardContent
          sx={{
            p: { xs: 1, sm: 1.5 },
            height: "100%",
            position: "relative",
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{
              color: "#fff",
              textShadow: "0 1px 3px rgba(0,0,0,0.3)",
              fontSize: { xs: "0.875rem", sm: "1rem" },
            }}
          >
            {board.name}
          </Typography>
        </CardContent>
      </Card>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}></Menu>
    </>
  );
}

export default Board;
