import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/commons/Sidebar"

function HomeLayout() {
  return (
    <Box sx={{ 
      display: "flex", 
      minHeight: "calc(100vh - 64px)",
      height: "calc(100vh - 64px)",
      overflow: "hidden",
    }}>
      <Sidebar />
      <Box sx={{ 
        flex: 1,
        overflow: "auto",
      }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default HomeLayout;