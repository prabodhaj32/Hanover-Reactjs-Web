import React, { useState, useEffect } from 'react';
import './Testimonials.css';
import { motion, AnimatePresence } from 'framer-motion';
import next_icon from '../../assets/next-icon.png';
import back_icon from '../../assets/back-icon.png';
import user_1 from '../../assets/user-1.png';
import user_2 from '../../assets/user-2.png';
import user_3 from '../../assets/user-3.png';
import user_4 from '../../assets/user-4.png';
import testimonialsData from '../../data/testimonials.json';
import { useTheme } from '../../context/ThemeContext';

const userImages = [user_1, user_2, user_3, user_4];

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    // Merge JSON data with local images
    const mergedTestimonials = testimonialsData.map((testimonial, index) => ({
      ...testimonial,
      image: userImages[index] || testimonial.image
    }));
    setTestimonials(mergedTestimonials);
  }, []);

  const slideForward = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev < testimonials.length - 1 ? prev + 1 : 0));
  };

  const slideBackward = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : testimonials.length - 1));
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <motion.section
      className={`testimonials ${isDarkMode ? 'dark-mode' : ''}`}
      id="testimonials"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.img
        src={next_icon}
        alt="Next"
        className="next-btn"
        onClick={slideForward}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && slideForward()}
        aria-label="Next testimonial"
      />
      <motion.img
        src={back_icon}
        alt="Previous"
        className="back-btn"
        onClick={slideBackward}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && slideBackward()}
        aria-label="Previous testimonial"
      />
      
      <div className="slider">
        <AnimatePresence mode="wait" custom={direction}>
          {testimonials.length > 0 && (
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="slide-wrapper"
            >
              <div className="slide">
                <div className="user-info">
                  <motion.img
                    src={testimonials[currentIndex]?.image}
                    alt={testimonials[currentIndex]?.name}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                  />
                  <div>
                    <h3>{testimonials[currentIndex]?.name}</h3>
                    <span>{testimonials[currentIndex]?.role || 'Hanover School, USA'}</span>
                  </div>
                </div>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {testimonials[currentIndex]?.text}
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Indicator dots */}
      <div className="testimonial-indicators">
        {testimonials.map((_, index) => (
          <motion.button
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default Testimonials;