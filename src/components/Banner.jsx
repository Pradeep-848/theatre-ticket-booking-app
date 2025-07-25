// src/components/Banner.jsx
import { motion } from "framer-motion";
import bannerImage from "../assets/images/banner.jpg";

const Banner = () => {
  return (
    <div className="relative w-full h-[30vh] sm:h-[40vh] lg:h-[50vh] overflow-hidden">
      <motion.img
        src={bannerImage}
        alt="Movie Banner"
        className="absolute w-full h-full object-cover"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 5, ease: "easeOut" }}
      />
      {/* <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      <div className="absolute bottom-4 left-4 text-white">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Book Your Movie</h1>
        <p className="text-sm sm:text-base mt-2">Experience cinema like never before</p>
      </div> */}
    </div>
  );
};

export default Banner;
