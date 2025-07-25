// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import SeatSelection from "../pages/SeatSelection";
import UserDetails from "../pages/UserDetails";
import Payment from "../pages/Payment";
import Confirmation from "../pages/Confirmation";
import Footer from "../components/Footer";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/select-seats" element={<SeatSelection />} />
            <Route path="/user-details" element={<UserDetails />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/confirmation" element={<Confirmation />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
