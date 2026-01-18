import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import BoardsPage from "./pages/AllBoardPage";
import BoardPage from "./pages/BoardPage";
import Navbar  from "./components/commons/Navbar";
import HomeLayout from "./layouts/HomeLayout";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        
        <Route path="/" element={<Navigate to="/boards"/>} />

        {/* HOME) */}
        <Route path="/boards" element={<HomeLayout />}>
          <Route index element={<BoardsPage />} />
        </Route>

        {/* SINGLE BOARD */}
        <Route path="/boards/:boardId" element={<BoardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
