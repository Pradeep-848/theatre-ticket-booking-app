// src/components/SeatLayout.jsx
import { motion } from "framer-motion";

const SeatLayout = ({ selectedSeats, onSeatSelect }) => {
  const rows = ["A", "B", "C", "D", "E"];
  const seatsPerRow = 10;

  return (
    <motion.div
      className="w-full overflow-x-auto py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <div className="min-w-max flex flex-col gap-4 items-center">
        {rows.map((row) => (
          <div key={row} className="flex gap-3">
            {Array.from({ length: seatsPerRow }, (_, i) => {
              const seatNumber = `${row}${i + 1}`;
              const isSelected = selectedSeats.includes(seatNumber);
              return (
                <motion.button
                  key={seatNumber}
                  className={`w-10 h-10 flex justify-center items-center rounded-lg font-medium border-2 transition-colors ${
                    isSelected
                      ? "bg-green-500 text-white border-green-600"
                      : "bg-white text-orange-900 border-orange-300 hover:border-orange-500"
                  }`}
                  onClick={() => onSeatSelect(seatNumber)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {seatNumber}
                </motion.button>
              );
            })}
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-green-500 rounded border border-green-600"></div>
          <span className="text-white">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-white rounded border border-orange-300"></div>
          <span className="text-white">Available</span>
        </div>
      </div>
    </motion.div>
  );
};

export default SeatLayout;
