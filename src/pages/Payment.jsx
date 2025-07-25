// src/pages/Payment.jsx
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import NavigationButtons from "../components/NavigationButtons";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { movieId, timing, selectedSeats, totalPrice, userDetails } =
    location.state || {};

  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePayment = (e) => {
    e.preventDefault();
    navigate("/confirmation", {
      state: {
        movieId,
        timing,
        selectedSeats,
        totalPrice,
        userDetails,
        paymentMethod,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-500 to-orange-600 pt-16 md:pt-20 px-4">
      {/* Back Button */}
      <NavigationButtons showHome={true} showBack={true} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-3xl mx-auto bg-white bg-opacity-90 rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="p-8">
          <h2 className="text-3xl font-bold text-orange-900 mb-6 text-center">
            Payment
          </h2>

          <div className="p-6 bg-orange-50 rounded-lg border-2 border-orange-200 mb-8">
            <h3 className="text-xl font-bold text-orange-900 mb-2">
              Movie: {movieId}
            </h3>
            <h3 className="text-xl font-bold text-orange-900 mb-2">
              Timing: {timing}
            </h3>
            <h3 className="text-xl font-bold text-orange-900 mb-2">
              Seats: {selectedSeats?.join(", ")}
            </h3>
            <h3 className="text-xl font-bold text-orange-900">
              Total: ₹{totalPrice}
            </h3>
          </div>

          <form onSubmit={handlePayment} className="space-y-6">
            <motion.div
              className="flex flex-wrap gap-6 mb-6 justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {["credit", "debit", "upi"].map((method) => (
                <motion.label
                  key={method}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer border-2 ${
                    paymentMethod === method
                      ? "border-orange-500 bg-orange-100"
                      : "border-gray-300"
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={() => setPaymentMethod(method)}
                    className="h-5 w-5 text-orange-600"
                  />
                  <span className="font-medium text-orange-900 capitalize">
                    {method} card
                  </span>
                </motion.label>
              ))}
            </motion.div>

            {paymentMethod !== "upi" ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="cardNumber"
                    className="font-semibold text-orange-900"
                  >
                    Card Number:
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={cardDetails.cardNumber}
                    onChange={handleCardChange}
                    placeholder="1234 5678 9012 3456"
                    className="p-3 border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="cardName"
                    className="font-semibold text-orange-900"
                  >
                    Cardholder Name:
                  </label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={cardDetails.cardName}
                    onChange={handleCardChange}
                    placeholder="John Doe"
                    className="p-3 border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="expiry"
                      className="font-semibold text-orange-900"
                    >
                      Expiry Date:
                    </label>
                    <input
                      type="text"
                      id="expiry"
                      name="expiry"
                      value={cardDetails.expiry}
                      onChange={handleCardChange}
                      placeholder="MM/YY"
                      className="p-3 border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="cvv"
                      className="font-semibold text-orange-900"
                    >
                      CVV:
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={cardDetails.cvv}
                      onChange={handleCardChange}
                      placeholder="123"
                      className="p-3 border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                      required
                    />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col gap-1"
              >
                <label
                  htmlFor="upiId"
                  className="font-semibold text-orange-900"
                >
                  UPI ID:
                </label>
                <input
                  type="text"
                  id="upiId"
                  name="upiId"
                  placeholder="yourname@upi"
                  className="p-3 border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                  required
                />
              </motion.div>
            )}

            <motion.button
              type="submit"
              className="w-full py-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-bold text-lg shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Pay ₹{totalPrice}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Payment;
