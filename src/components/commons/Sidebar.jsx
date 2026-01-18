import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

function Sidebar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (isMobile) return null;

  return (
    <Box
      sx={{
        width: 260,
        borderRight: "1px solid #2c333a",
        bgcolor: "#1d2125",
        p: 2,
        height: "100%",
      }}
    >
      <List>
        {["Boards", "Templates", "Home"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText
                primary={text}
                primaryTypographyProps={{ color: "#9fadbc" }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Typography
        sx={{
          mt: 4,
          mb: 1,
          fontSize: 12,
          fontWeight: 600,
          color: "#5e6c84",
        }}
      >
        Workspaces
      </Typography>

      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText
              primary="Trello Workspace"
              primaryTypographyProps={{ color: "#9fadbc" }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}

export default Sidebar;
