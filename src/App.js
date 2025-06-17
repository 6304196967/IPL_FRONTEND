import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/home";
import Main from "./pages/main";
import Cards from "./pages/cards";
import FranchiseDetails from "./pages/franchiseplayers";
import Purses from "./pages/purses";  
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/main" element={<Main/>} />
      <Route path="/franchisecards" element={<Cards/>} />
      <Route path="/franchise/:franchiseName" element={<FranchiseDetails/>} />
      <Route path="/purses" element={<Purses/>} />
    </Routes>
  );
}

export default App;
