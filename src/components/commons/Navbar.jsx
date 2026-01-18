import { AppBar, Toolbar, Typography, Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import TrelloLogo from "../../assets/image.png"

function Navbar() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "#1d2125",
        borderBottom: "1px solid #2c333a",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 0.8, sm: 1.2 },
            cursor: "pointer",
            flex: 1,
          }}
          onClick={() => navigate("/boards")}
        >
          {/* Logo */}
          <Box
            component="img"
            src={TrelloLogo}
            alt="Trello"
            sx={{
              height: { xs: 20, sm: 24 },
              width: "auto",
            }}
          />

          {/* Text */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "16px", sm: "20px" },
            }}
          >
            Trello
          </Typography>
        </Box>

        {isMobile && (
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ ml: 'auto' }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;