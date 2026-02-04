import React from 'react';
import './Programs.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import programsData from '../../data/programs.json';
import program_1 from '../../assets/program-1.png';
import program_2 from '../../assets/program-2.png';
import program_3 from '../../assets/program-3.png';
import program_icon_1 from '../../assets/program-icon-1.png';
import program_icon_2 from '../../assets/program-icon-2.png';
import program_icon_3 from '../../assets/program-icon-3.png';

const imageMap = {
  '/src/assets/program-1.png': program_1,
  '/src/assets/program-2.png': program_2,
  '/src/assets/program-3.png': program_3,
  '/src/assets/program-icon-1.png': program_icon_1,
  '/src/assets/program-icon-2.png': program_icon_2,
  '/src/assets/program-icon-3.png': program_icon_3,
};

const Programs = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleProgramClick = (programId) => {
    navigate(`/programs/${programId}`);
  };

  const handleProgramKeyDown = (e, programId) => {
    // Support keyboard activation for accessibility
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleProgramClick(programId);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section
      className={`programs ${isDarkMode ? 'dark-mode' : ''}`}
      id="program"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {programsData.map((program) => (
        <motion.div
          key={program.id}
          className={`program ${isDarkMode ? 'dark-mode' : ''}`}
          variants={cardVariants}
          whileHover={{ y: -10 }}
          transition={{ type: "spring", stiffness: 300 }}
          onClick={() => handleProgramClick(program.id)}
          onKeyDown={(e) => handleProgramKeyDown(e, program.id)}
          role="button"
          tabIndex={0}
          aria-label={`View ${program.type} programs`}
          style={{ cursor: 'pointer' }}
        >
          <motion.img
            src={imageMap[program.image]}
            alt={program.type}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="caption"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.img
              src={imageMap[program.icon]}
              alt={`${program.type} icon`}
              initial={{ scale: 0, rotate: -180 }}
              whileHover={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
            />
            <p>{program.type}</p>
            <span className="program-description">{program.description}</span>
          </motion.div>
        </motion.div>
      ))}
    </motion.section>
  );
};

export default Programs;