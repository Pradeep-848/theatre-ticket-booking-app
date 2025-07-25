// src/components/MovieCard.jsx
import { motion } from "framer-motion";

const MovieCard = ({ movie, onBookNow }) => {
  return (
    <div className="flex flex-col md:flex-row w-full bg-white bg-opacity-90 rounded-xl overflow-hidden shadow-2xl border-2 border-orange-200 mx-2 md:mx-0">
      {/* Movie Poster and Info */}
      <div className="w-full md:w-[30%] p-4 flex flex-col md:flex-row items-center bg-orange-50">
        <motion.img
          src={movie.poster}
          alt={movie.title}
          className="w-24 h-32 md:w-32 md:h-40 object-cover rounded-lg shadow-md"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
        <div className="mt-3 md:mt-0 md:ml-4 text-center md:text-left">
          <h3 className="font-bold text-lg text-orange-900">{movie.title}</h3>
          <p className="text-sm text-gray-600">{movie.genre}</p>
          <p className="text-sm text-blue-600 font-medium">{movie.language}</p>
        </div>
      </div>

      {/* Show Times - Centered vertically */}
      <div className="w-full md:w-[70%] flex items-center p-2">
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 w-full">
          {movie.timings.map((timing, index) => (
            <motion.button
              key={index}
              className="w-full h-10 px-1 py-1 bg-white border border-green-500 text-green-600 
                        rounded text-sm font-medium hover:bg-green-50 transition-all truncate flex items-center justify-center"
              onClick={() => onBookNow(movie.id, timing)}
              whileHover={{
                scale: 1.02,
                backgroundColor: "#f0fdf4",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="truncate">{timing}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
