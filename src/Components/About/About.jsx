import React from 'react';
import './About.css';
import { motion } from 'framer-motion';
import about_img from '../../assets/about.png';
import play_icon from '../../assets/play-icon.png';
import { useTheme } from '../../context/ThemeContext';

const About = ({ setPlayState }) => {
  const { isDarkMode } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section
      className={`about ${isDarkMode ? 'dark-mode' : ''}`}
      id="about"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.div
        className="about-left"
        variants={imageVariants}
      >
        <motion.img
          src={about_img}
          alt="About Hanover School"
          className="about-img"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        />
        <motion.img
          src={play_icon}
          alt="Play Video"
          className="play-icon"
          onClick={() => setPlayState(true)}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setPlayState(true);
            }
          }}
          aria-label="Play Video"
        />
      </motion.div>

      <motion.div
        className="about-right"
        variants={itemVariants}
      >
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          ABOUT HANOVER SCHOOL
        </motion.h3>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Nurturing Tomorrow's Leaders Today
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Hanover School stands as a beacon of modern education, dedicated to fostering academic
          excellence and innovation. It is a forward-thinking institution that prioritizes the
          holistic development of students, ensuring they are equipped with the knowledge, skills,
          and mindset to thrive in an interconnected and rapidly evolving world.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          The school is renowned for its comprehensive academic offerings,
          ranging from undergraduate to postgraduate programs across various disciplines such
          as Engineering, Business, Computer Science, Media Studies, Arts, and more. Additionally,
          Hanover School provides specialized professional courses and certifications in cutting-edge fields
          like Artificial Intelligence, Data Science, Digital Marketing, and Cybersecurity, designed to
          meet the demands of a competitive job market.
        </motion.p>
      </motion.div>
    </motion.section>
  );
};

export default About;


// import React from 'react';
// import './About.css';
// import about_img from '../../assets/about.png';
// import play_icon from '../../assets/play-icon.png';

// const About = ({ setPlayState }) => {
//   return (
//     <div className="about">
//       {/* Left Section */}
//       <div className="about-left">
//         <img src={about_img} alt="About Hanover School" className="about-img" />
//         <img 
//           src={play_icon} 
//           alt="Play Video" 
//           className="play-icon" 
//           onClick={() => setPlayState(true)} 
//           role="button" 
//           aria-label="Play Video"
//         />
//       </div>

//       {/* Right Section */}
//       <div className="about-right">
//         <h3>ABOUT HANOVER SCHOOL</h3>
//         <h2>Nurturing Tomorrow's Leaders Today</h2>
//         <p>
//           Hanover School stands as a beacon of modern education, dedicated to fostering academic
//           excellence and innovation. It is a forward-thinking institution that prioritizes the holistic
//           development of students, ensuring they are equipped with the knowledge, skills, and mindset
//           to thrive in an interconnected and rapidly evolving world.
//         </p>
//         <p>
//           The school is renowned for its comprehensive academic offerings, ranging from undergraduate 
//           to postgraduate programs across various disciplines such as Engineering, Business, Computer Science, 
//           Media Studies, Arts, and more. Additionally, Hanover School provides specialized professional courses and 
//           certifications in cutting-edge fields like Artificial Intelligence, Data Science, Digital Marketing, 
//           and Cybersecurity, designed to meet the demands of a competitive job market.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default About;
