// src/components/SeatLayout.jsx
import { motion } from "framer-motion";

const SeatLayout = ({ selectedSeats, onSeatSelect }) => {
  const rows = ["E", "D", "C", "B", "A"];
  const seatsPerRow = 10;

  return (
    <motion.div
      className="w-full overflow-x-auto py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <div className="mt-4 min-w-max flex flex-col gap-4 items-center">
        {rows.map((row) => (
          <div key={row} className="flex gap-3">
            {Array.from({ length: seatsPerRow }, (_, i) => {
              const seatNumber = `${row}${i + 1}`;
              const isSelected = selectedSeats.includes(seatNumber);
              return (
                <motion.button
                  key={seatNumber}
                  className={`w-10 h-10 flex justify-center items-center rounded-lg font-medium border-2 transition-colors ${isSelected
                    ? "bg-orange-500 text-white border-orange-600"
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
    </motion.div>
  );
};

export default SeatLayout;
