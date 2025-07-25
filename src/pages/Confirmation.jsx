// src/pages/Confirmation.jsx
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import NavigationButtons from "../components/NavigationButtons";

const Confirmation = () => {
  const location = useLocation();
  const {
    movieId,
    timing,
    selectedSeats,
    totalPrice,
    userDetails,
    paymentMethod,
  } = location.state || {};

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-500 to-orange-600 pt-16 md:pt-20 px-4">
      {/* Back Button */}
      <NavigationButtons showHome={true} showBack={true} />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-4xl mx-auto bg-white bg-opacity-90 rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="p-8 text-center">
          <motion.h2
            className="text-4xl font-bold text-orange-900 mb-4"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ type: "spring" }}
          >
            Booking Confirmed!
          </motion.h2>

          <motion.p
            className="text-xl text-orange-800 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Thank you, <span className="font-bold">{userDetails?.name}</span>!
            Your tickets are booked.
          </motion.p>

          <div className="grid md:grid-cols-2 gap-6 text-left">
            <motion.div
              className="p-6 bg-orange-50 rounded-xl border-2 border-orange-200"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-orange-900 mb-4 border-b-2 border-orange-200 pb-2">
                Ticket Details
              </h3>
              <p className="mb-2">
                <span className="font-semibold">Movie:</span> {movieId}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Show Time:</span> {timing}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Seats:</span>{" "}
                {selectedSeats?.join(", ")}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Total Paid:</span> ₹{totalPrice}
              </p>
              <p>
                <span className="font-semibold">Payment Method:</span>{" "}
                {paymentMethod}
              </p>
            </motion.div>

            <motion.div
              className="p-6 bg-orange-50 rounded-xl border-2 border-orange-200"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold text-orange-900 mb-4 border-b-2 border-orange-200 pb-2">
                User Details
              </h3>
              <p className="mb-2">
                <span className="font-semibold">Name:</span> {userDetails?.name}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Email:</span>{" "}
                {userDetails?.email}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Mobile:</span>{" "}
                {userDetails?.mobile}
              </p>
            </motion.div>
          </div>

          <motion.div
            className="mt-8 pt-6 border-t-2 border-orange-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-lg text-orange-900 mb-2">
              Your e-ticket has been sent to{" "}
              <span className="font-bold">{userDetails?.email}</span>.
            </p>
            <p className="text-lg text-orange-900 font-bold">
              Enjoy your movie experience!
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Confirmation;
