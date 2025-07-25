// src/pages/UserDetails.jsx
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import NavigationButtons from "../components/NavigationButtons";

const UserDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { movieId, timing, selectedSeats, totalPrice } = location.state || {};

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/payment", {
      state: {
        movieId,
        timing,
        selectedSeats,
        totalPrice,
        userDetails: formData,
      },
    });
  };

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-orange-500 to-orange-600 pt-16 md:pt-20 px-4">
      {/* Back Button */}
      <NavigationButtons showHome={true} showBack={true} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl mx-auto bg-white bg-opacity-90 rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="p-8">
          <h2 className="text-3xl font-bold text-orange-900 mb-6 text-center">
            Enter Your Details
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              className="flex flex-col gap-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label htmlFor="name" className="font-semibold text-orange-900">
                Full Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="p-3 border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                required
              />
            </motion.div>

            <motion.div
              className="flex flex-col gap-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label htmlFor="email" className="font-semibold text-orange-900">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="p-3 border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                required
              />
            </motion.div>

            <motion.div
              className="flex flex-col gap-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label htmlFor="mobile" className="font-semibold text-orange-900">
                Mobile Number:
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="p-3 border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                required
                pattern="[0-9]{10}"
              />
            </motion.div>

            <motion.div
              className="p-4 bg-orange-50 rounded-lg border-2 border-orange-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="font-bold text-orange-900">
                Selected Seats: {selectedSeats?.join(", ")}
              </h3>
              <h3 className="font-bold text-orange-900">
                Total Price: ₹{totalPrice}
              </h3>
            </motion.div>

            <motion.button
              type="submit"
              className="w-full py-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-bold text-lg shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Proceed to Payment
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default UserDetails;
