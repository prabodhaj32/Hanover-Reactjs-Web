import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import programsData from '../../data/programs.json';
import './DegreeProgramsList.css';
import program_1 from '../../assets/program-1.png';
import program_2 from '../../assets/program-2.png';
import program_3 from '../../assets/program-3.png';

const imageMap = {
  '/src/assets/program-1.png': program_1,
  '/src/assets/program-2.png': program_2,
  '/src/assets/program-3.png': program_3,
};

const DegreeProgramsList = () => {
  const { programId } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const program = programsData.find(p => p.id === parseInt(programId));

  if (!program) {
    return (
      <div className={`degree-programs-list ${isDarkMode ? 'dark-mode' : ''}`}>
        <div className="container">
          <h2>Program type not found</h2>
        </div>
      </div>
    );
  }

  const handleDegreeClick = (degreeId) => {
    navigate(`/degree/${degreeId}`);
  };

  return (
    <motion.div
      className={`degree-programs-list ${isDarkMode ? 'dark-mode' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        <motion.div
          className="program-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="program-image">
            <motion.img
              src={imageMap[program.image]}
              alt={program.type}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            />
          </div>
          <div className="program-info">
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {program.type}
            </motion.h1>
            <motion.p
              className="program-description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {program.description}
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          className="degrees-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h2>Available Degrees</h2>
          <div className="degrees-grid">
            {program.degrees.map((degree, index) => (
              <motion.div
                key={degree.id}
                className="degree-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => handleDegreeClick(degree.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className="degree-header">
                  <h3>{degree.name}</h3>
                  <div className="degree-meta">
                    <span className="duration">{degree.duration}</span>
                    <span className="price">{degree.price}</span>
                  </div>
                </div>
                <p className="degree-description">{degree.description}</p>
                <div className="view-details">
                  <span>Click to view details</span>
                  <motion.div
                    className="arrow"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    →
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DegreeProgramsList;