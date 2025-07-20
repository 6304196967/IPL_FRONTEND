import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/home";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import ResetPassword from "./pages/resetpass";
import ForgotPassword from "./pages/forgotpass";
import MyAuctions from "./pages/myauctions";
import UpcomingAuctions from "./pages/upcomingauctions";
import Profile from "./pages/profile";
import CreateAuction from "./pages/createauction";
import JoinedAuctions from "./pages/joinedauctions";


import Auctionlive from "./pages/main";
import Cards from "./pages/cards";
import FranchiseDetails from "./pages/franchiseDetails";
import Purses from "./pages/purses";  
import NotFound from "./pages/notfound";
function App() {
  return (
    <Routes>
      <Route path="/IPL_FRONTEND" element={<Home/>} />
      <Route path="/signin" element={<Signin/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/reset-password/:token" element={<ResetPassword/>} />
      <Route path="/forgot-password" element={<ForgotPassword/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/my-auctions" element={<MyAuctions/>} />
      <Route path="/upcoming-auctions" element={<UpcomingAuctions/>} />
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/create-auction" element={<CreateAuction/>} />
      <Route path="/joined-auctions" element={<JoinedAuctions/>} />

      <Route path="/live/:auctionId" element={<Auctionlive/>} />
      <Route path="/auctionteamcards/:auctionId" element={<Cards/>} />
      <Route path="/franchise" element={<FranchiseDetails/>} />

      <Route path="/teampurses/:auctionId" element={<Purses/>} />
      <Route path="*" element= {<NotFound/>} />
    </Routes>
  );
}

export default App;
