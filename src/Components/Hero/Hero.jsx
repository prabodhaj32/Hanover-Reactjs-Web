import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import './Hero.css';
import { Link } from 'react-scroll';
import dark_arrow from '../../assets/dark-arrow.png';
import play_icon from '../../assets/play-icon.png';
import hero_img from '../../assets/hero.png';
import logo from '../../assets/logo2.png';
import heroBackground from '../../assets/hero1.jpg';

// Animation variants for staggered entrance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 15 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2
    }
  }
};

const Hero = () => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollIndicator(window.scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.section
      className="hero"
      id="hero"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Content wrapper */}
      <div className="hero-content">
        <div className="hero-left">
          {/* University Logo */}
          <motion.div 
            className="hero-logo-container"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <motion.img
              src={logo}
              alt="Hanover School Logo"
              className="hero-logo"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="logo-badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
            >
              Since 1965
            </motion.div>
          </motion.div>

          <motion.div className="hero-text" variants={itemVariants}>
            <motion.h1 variants={itemVariants}>
              Excellence in Education<br />
              <span className="highlight-text">At Hanover School</span>
            </motion.h1>
            
            <motion.p variants={itemVariants}>
              Discover a world of opportunities at Hanover School. Where tradition meets innovation 
              and students are empowered to achieve their full potential.
            </motion.p>
            
            {/* CTA Button */}
            <motion.div className="hero-cta-group" variants={itemVariants}>
              <motion.div variants={buttonVariants} whileHover="hover">
                <Link to="program" smooth={true} offset={-100} duration={500}>
                  <button className="btn hero-btn-primary" aria-label="Find courses">
                    Find Courses
                    <img src={dark_arrow} alt="" aria-hidden="true" />
                  </button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust Rating */}
            <motion.div className="trust-rating" variants={itemVariants}>
              <div className="stars">
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
              <span className="rating-text">4.9 (2,587 reviews)</span>
            </motion.div>
          </motion.div>
        </div>

        <div className="hero-right">
          {/* Stats Cards */}
          <motion.div className="stats-cards" variants={itemVariants}>
            <motion.div 
              className="stat-card"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="stat-number">15,000+</div>
              <div className="stat-label">Enrolled Students</div>
            </motion.div>
            
            <motion.div 
              className="stat-card"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="stat-number">85%</div>
              <div className="stat-label">Graduation Rate</div>
            </motion.div>
          </motion.div>

          {/* Featured Program Card */}
          <motion.div 
            className="featured-course"
            variants={itemVariants}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="course-image">
              <img src={hero_img} alt="Featured Program" />
            </div>
            <div className="course-content">
              <div className="course-category">Undergraduate</div>
              <h3 className="course-title">Bachelor of Science in Computer Science</h3>
              <div className="course-meta">
                <span className="course-lessons">120 Credits</span>
                <span className="course-duration">4 Years</span>
              </div>
              <div className="course-footer">
                <div className="course-price">$8,500/year</div>
                <div className="course-instructor">
                  <div className="instructor-avatar">HS</div>
                  <span>Hanover School</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <motion.div
            className="scroll-mouse"
            animate={{
              y: [0, 8, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="scroll-wheel" />
          </motion.div>
          <span className="scroll-text">Scroll to explore</span>
        </motion.div>
      )}
    </motion.section>
  );
};

export default Hero;
