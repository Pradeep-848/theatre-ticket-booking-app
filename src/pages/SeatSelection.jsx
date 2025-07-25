// src/pages/SeatSelection.jsx
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SeatLayout from "../components/SeatLayout";
import { CheckCircle, X, ArrowLeft } from "lucide-react"; // Added ArrowLeft icon
import NavigationButtons from "../components/NavigationButtons";

const SeatSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { movieId, timing } = location.state || {};

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const seatPrice = 180;

  const handleSeatSelect = (seatNumber) => {
    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((seat) => seat !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const handleProceed = () => {
    setShowConfirmation(true);
  };

  const confirmBooking = () => {
    navigate("/user-details", {
      state: {
        movieId,
        timing,
        selectedSeats,
        totalPrice: selectedSeats.length * seatPrice,
      },
    });
  };

  // Function to navigate back to home
  const goBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-500 to-orange-600 pt-16 md:pt-20 px-4">
      {/* Back Button */}
      <NavigationButtons showHome={true} showBack={true} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-white mb-6 text-center drop-shadow-lg">
          Select Your Seats
        </h2>

        {/* Screen Display */}
        <motion.div
          className="w-full h-16 bg-gradient-to-b from-gray-800 to-gray-900 text-white flex justify-center items-center my-6 rounded-lg shadow-xl relative"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" }}
        >
          <div className="absolute top-0 w-3/4 h-1 bg-yellow-400 rounded-b-full shadow-md"></div>
          <span className="text-orange-400 font-bold text-lg">SCREEN</span>
        </motion.div>

        {/* Seat Layout */}
        <SeatLayout
          selectedSeats={selectedSeats}
          onSeatSelect={handleSeatSelect}
        />

        {/* Booking Summary */}
        <motion.div
          className="w-full p-6 bg-white bg-opacity-90 rounded-xl shadow-2xl mt-8"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="space-y-2">
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
              className={`px-8 py-3 rounded-xl text-white text-lg font-bold shadow-lg transition-all ${
                selectedSeats.length === 0
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

      {/* Confirmation Dialog */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-orange-900 flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={24} />
                  Confirm Booking
                </h3>
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Seats:</span>
                  <span className="font-medium">
                    {selectedSeats.join(", ")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Show Time:</span>
                  <span className="font-medium">{timing}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Price:</span>
                  <span className="font-bold text-orange-600">
                    ₹{selectedSeats.length * seatPrice}
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmBooking}
                  className="flex-1 py-2 px-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SeatSelection;
// // src/pages/SeatSelection.jsx
// import { useNavigate, useLocation } from "react-router-dom";
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import SeatLayout from "../components/SeatLayout";
// import { CheckCircle, X } from "lucide-react";

// const SeatSelection = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { movieId, timing } = location.state || {};

//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const seatPrice = 180;

//   const handleSeatSelect = (seatNumber) => {
//     setSelectedSeats((prev) =>
//       prev.includes(seatNumber)
//         ? prev.filter((seat) => seat !== seatNumber)
//         : [...prev, seatNumber]
//     );
//   };

//   const handleProceed = () => {
//     setShowConfirmation(true);
//   };

//   const confirmBooking = () => {
//     navigate("/user-details", {
//       state: {
//         movieId,
//         timing,
//         selectedSeats,
//         totalPrice: selectedSeats.length * seatPrice,
//       },
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-orange-500 to-orange-600 p-4">
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//         className="w-full max-w-6xl mx-auto"
//       >
//         <h2 className="text-3xl font-bold text-white mb-6 text-center drop-shadow-lg">
//           Select Your Seats
//         </h2>

//         {/* Screen Display */}
//         <motion.div
//           className="w-full h-16 bg-gradient-to-b from-gray-800 to-gray-900 text-white flex justify-center items-center my-6 rounded-lg shadow-xl relative"
//           initial={{ scale: 0.9 }}
//           animate={{ scale: 1 }}
//           transition={{ type: "spring" }}
//         >
//           <div className="absolute top-0 w-3/4 h-1 bg-yellow-400 rounded-b-full shadow-md"></div>
//           <span className="text-orange-400 font-bold text-lg">SCREEN</span>
//         </motion.div>

//         {/* Seat Layout */}
//         <SeatLayout
//           selectedSeats={selectedSeats}
//           onSeatSelect={handleSeatSelect}
//         />

//         {/* Booking Summary */}
//         <motion.div
//           className="w-full p-6 bg-white bg-opacity-90 rounded-xl shadow-2xl mt-8"
//           initial={{ y: 50 }}
//           animate={{ y: 0 }}
//         >
//           <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//             <div className="space-y-2">
//               <h3 className="text-xl font-bold text-orange-900">
//                 Selected Seats:{" "}
//                 <span className="text-orange-600 font-semibold">
//                   {selectedSeats.join(", ") || "None"}
//                 </span>
//               </h3>
//               <h3 className="text-xl font-bold text-orange-900">
//                 Total Price:{" "}
//                 <span className="text-orange-600 font-semibold">
//                   ₹{selectedSeats.length * seatPrice}
//                 </span>
//               </h3>
//             </div>
//             <motion.button
//               className={`px-8 py-3 rounded-xl text-white text-lg font-bold shadow-lg transition-all ${
//                 selectedSeats.length === 0
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-orange-600 hover:bg-orange-700"
//               }`}
//               onClick={handleProceed}
//               disabled={selectedSeats.length === 0}
//               whileHover={selectedSeats.length > 0 ? { scale: 1.05 } : {}}
//               whileTap={selectedSeats.length > 0 ? { scale: 0.95 } : {}}
//             >
//               Proceed to Book
//             </motion.button>
//           </div>
//         </motion.div>
//       </motion.div>

//       {/* Confirmation Dialog */}
//       <AnimatePresence>
//         {showConfirmation && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
//           >
//             <motion.div
//               initial={{ scale: 0.9, y: 20 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.9, y: 20 }}
//               className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl"
//             >
//               <div className="flex justify-between items-start mb-4">
//                 <h3 className="text-2xl font-bold text-orange-900 flex items-center gap-2">
//                   <CheckCircle className="text-green-500" size={24} />
//                   Confirm Booking
//                 </h3>
//                 <button
//                   onClick={() => setShowConfirmation(false)}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   <X size={24} />
//                 </button>
//               </div>

//               <div className="space-y-4 mb-6">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Seats:</span>
//                   <span className="font-medium">
//                     {selectedSeats.join(", ")}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Show Time:</span>
//                   <span className="font-medium">{timing}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Total Price:</span>
//                   <span className="font-bold text-orange-600">
//                     ₹{selectedSeats.length * seatPrice}
//                   </span>
//                 </div>
//               </div>

//               <div className="flex gap-4">
//                 <button
//                   onClick={() => setShowConfirmation(false)}
//                   className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={confirmBooking}
//                   className="flex-1 py-2 px-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
//                 >
//                   Confirm
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default SeatSelection;
