// src/pages/Home.jsx
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Banner from "../components/Banner";
import MovieCard from "../components/MovieCard";
import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import NavigationButtons from "../components/NavigationButtons";

const Home = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("25");
  const [showLanguageFilter, setShowLanguageFilter] = useState(false);
  const [showFormatFilter, setShowFormatFilter] = useState(false);
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [showShowtimeFilter, setShowShowtimeFilter] = useState(false);
  const [premiumSeats, setPremiumSeats] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const dates = [
    { day: "Thu", date: "24" },
    { day: "Fri", date: "25" },
  ];

  const movies = [
    {
      id: 1,
      title: "Coolie",
      genre: "UA13+ • Action",
      language: "Tamil",
      poster: "src/assets/images/movieFolder/coolie.jpg",
      timings: ["10:00 AM", "2:00 PM", "6:00 PM", "10:00 PM"],
    },
  ];

  const handleBookNow = (movieId, timing) => {
    const selectedMovie = movies.find((movie) => movie.id === movieId);
    navigate("/select-seats", {
      state: {
        movie: selectedMovie,
        timing,
        date: selectedDate,
      },
    });
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-400 to-orange-600">
      {/* <NavigationButtons showHome={false} showBack={true} /> */}

      {/* Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <Banner />
      </motion.div>

      {/* Filter Bar */}
      <div className="bg-orange-500 shadow-sm p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto">
          {/* Date Selection */}
          <div className="flex items-center mb-4 overflow-x-auto pb-2 mt-2 scrollbar-hide">
            {dates.map((dateObj) => (
              <button
                key={dateObj.date}
                onClick={() => setSelectedDate(dateObj.date)}
                className={`flex-shrink-0 mr-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedDate === dateObj.date
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-200"
                }`}
              >
                <div className="text-xs">{dateObj.day}</div>
                <div className="font-bold">{dateObj.date}</div>
              </button>
            ))}
          </div>

          {/* Filter Options */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <span className="text-sm font-medium text-white">Filter By</span>

              {/* Language Filter */}
              <div className="relative">
                <button
                  onClick={() => setShowLanguageFilter(!showLanguageFilter)}
                  className="flex items-center space-x-1 text-sm text-white hover:text-gray-200"
                >
                  <span>Language</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      showLanguageFilter ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {showLanguageFilter && (
                  <div className="absolute z-10 mt-2 w-40 bg-white rounded-md shadow-lg py-1">
                    {["All", "Tamil", "Hindi", "English"].map((lang) => (
                      <button
                        key={lang}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowLanguageFilter(false)}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Format Filter */}
              <div className="relative">
                <button
                  onClick={() => setShowFormatFilter(!showFormatFilter)}
                  className="flex items-center space-x-1 text-sm text-white hover:text-gray-200"
                >
                  <span>Format</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      showFormatFilter ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {showFormatFilter && (
                  <div className="absolute z-10 mt-2 w-40 bg-white rounded-md shadow-lg py-1">
                    {["All", "2D", "3D", "IMAX"].map((format) => (
                      <button
                        key={format}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowFormatFilter(false)}
                      >
                        {format}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Filter */}
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setShowPriceFilter(!showPriceFilter)}
                  className="flex items-center space-x-1 text-sm text-white hover:text-gray-200"
                >
                  <span>Price</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      showPriceFilter ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {showPriceFilter && (
                  <div className="absolute z-10 mt-2 w-40 bg-white rounded-md shadow-lg py-1">
                    {["All", "Under ₹200", "₹200-₹300", "Over ₹300"].map(
                      (price) => (
                        <button
                          key={price}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setShowPriceFilter(false)}
                        >
                          {price}
                        </button>
                      )
                    )}
                  </div>
                )}
              </div>

              {/* Showtime Filter */}
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setShowShowtimeFilter(!showShowtimeFilter)}
                  className="flex items-center space-x-1 text-sm text-white hover:text-gray-200"
                >
                  <span>Showtime</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      showShowtimeFilter ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {showShowtimeFilter && (
                  <div className="absolute z-10 mt-2 w-40 bg-white rounded-md shadow-lg py-1">
                    {["All", "Morning", "Afternoon", "Evening", "Night"].map(
                      (time) => (
                        <button
                          key={time}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setShowShowtimeFilter(false)}
                        >
                          {time}
                        </button>
                      )
                    )}
                  </div>
                )}
              </div>

              {/* Premium Seats */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="premium"
                  checked={premiumSeats}
                  onChange={(e) => setPremiumSeats(e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="premium" className="text-sm text-white">
                  Premium Seats
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-orange-500 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white"
              size={20}
            />
            <input
              type="text"
              placeholder="Search movies..."
              className="w-full pl-10 pr-4 py-2 border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white bg-opacity-90"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Movie Cards */}
      <div className="max-w-7xl mx-auto p-4">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {movies.map((movie) => (
            <motion.div
              key={movie.id}
              variants={{
                hidden: { opacity: 0, x: -50 },
                show: { opacity: 1, x: 0 },
              }}
              whileHover={{ scale: 1.005 }}
              className="w-full"
            >
              <MovieCard movie={movie} onBookNow={handleBookNow} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
