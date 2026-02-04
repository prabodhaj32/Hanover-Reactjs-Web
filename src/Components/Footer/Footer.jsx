import React from 'react';
import './Footer.css';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const Footer = () => {
  const { isDarkMode } = useTheme();

  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className={`footer ${isDarkMode ? 'dark-mode' : ''}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="footer-content">
        <motion.div
          className="footer-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <p>© {currentYear} Hanover School. All rights reserved.</p>
        </motion.div>
        
        <motion.div
          className="footer-right"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <ul>
            <motion.li
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <a href="#terms">Terms of Service</a>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <a href="#privacy">Privacy Policy</a>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <a href="#contact">Contact Us</a>
            </motion.li>
          </ul>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;