// src/pages/SeatSelection.jsx
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SeatLayout from "../components/SeatLayout";
import NavigationButtons from "../components/NavigationButtons";
import PaymentDialog from "../dialog/PaymentDialog";
import UserDetailsDialog from "../dialog/UserDetailsDialog";

const SeatSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { movieId, timing } = location.state || {};

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: ""
  });
  const seatPrice = 180;

  const handleSeatSelect = (seatNumber) => {
    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((seat) => seat !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const handleProceed = () => {
    setShowUserDetails(true);
  };

  const handleUserDetailsSubmit = (e) => {
    e.preventDefault();
    setShowUserDetails(false);
    setShowPayment(true);
  };

  const handlePaymentComplete = () => {
    setShowPayment(false);
    navigate("/get-tickets", {
      state: {
        movieId,
        timing,
        selectedSeats,
        totalPrice: selectedSeats.length * seatPrice,
        userDetails: formData
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-orange-100 pt-16 md:pt-20 px-4">
      <NavigationButtons showHome={true} showBack={true} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl mx-auto"
      >
        <h2 className="text-2xl font-bold text-black text-center drop-shadow-lg">
          Select Your Seats
        </h2>

        {/* Seat Layout */}
        <SeatLayout
          selectedSeats={selectedSeats}
          onSeatSelect={handleSeatSelect}
        />

        {/* Screen Display */}
        <motion.div
          className="relative w-full h-12 flex justify-center items-end"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          {/* Curved screen base */}
          <div className="w-[90%] h-10 bg-gradient-to-b from-gray-700 to-gray-900 rounded-b-[50%] shadow-2xl border-t-4 border-yellow-400 flex items-end justify-center">
            <span className="text-orange-400 font-bold text-sm sm:text-base md:text-lg pb-1">
              SCREEN
            </span>
          </div>

          {/* Optional glow below screen */}
          <div className="absolute bottom-[-6px] w-[60%] h-1 rounded-full blur-sm bg-yellow-300 opacity-60"></div>
        </motion.div>

        {/* Booking Summary */}
        <motion.div
          className="w-full p-6 bg-white bg-opacity-90 rounded-xl shadow-2xl mt-8"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-xl font-bold text-orange-900">
                Selected Seats:{" "}
                <span className="text-orange-600 font-semibold">
                  {selectedSeats.join(", ") || "None"}
                </span>
              </h3>
              <h3 className="text-xl font-bold text-orange-900">
                Total Price:{" "}
                <span className="text-orange-600 font-semibold">
                  ₹{selectedSeats.length * seatPrice}
                </span>
              </h3>
            </div>
            <motion.button
              className={`px-8 py-3 rounded-xl text-white text-lg font-bold shadow-lg transition-all ${selectedSeats.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-600 hover:bg-orange-700"
                }`}
              onClick={handleProceed}
              disabled={selectedSeats.length === 0}
              whileHover={selectedSeats.length > 0 ? { scale: 1.05 } : {}}
              whileTap={selectedSeats.length > 0 ? { scale: 0.95 } : {}}
            >
              Proceed to Book
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* User Details Dialog */}
      <AnimatePresence>
        {showUserDetails && (
          <UserDetailsDialog
            formData={formData}
            handleChange={handleChange}
            handleUserDetailsSubmit={handleUserDetailsSubmit}
            onClose={() => setShowUserDetails(false)}
          />
        )}
      </AnimatePresence>

      {/* Payment Dialog */}
      <AnimatePresence>
        {showPayment && (
          <PaymentDialog
            selectedSeats={selectedSeats}
            seatPrice={seatPrice}
            handlePaymentComplete={handlePaymentComplete}
            onClose={() => setShowPayment(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SeatSelection;