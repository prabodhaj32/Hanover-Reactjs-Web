import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import programsData from '../../data/programs.json';
import './DegreeDetails.css';
import program_1 from '../../assets/program-1.png';
import program_2 from '../../assets/program-2.png';
import program_3 from '../../assets/program-3.png';

const imageMap = {
  '/src/assets/program-1.png': program_1,
  '/src/assets/program-2.png': program_2,
  '/src/assets/program-3.png': program_3,
};

const DegreeDetails = () => {
  const { degreeId } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  // Modal and form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form handling functions
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Prepare data for backend
      const applicationData = {
        ...formData,
        degreeProgram: degree.name,
        programType: programType.type,
        submittedAt: new Date().toISOString()
      };
      
      console.log('Application submitted:', applicationData);
      
      setSubmitSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitSuccess(false);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          message: ''
        });
      }, 3000);
      
    } catch (error) {
      console.error('Submission error:', error);
      setFormErrors({ submit: 'Failed to submit application. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    setFormErrors({});
    setSubmitSuccess(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      message: ''
    });
    setFormErrors({});
    setSubmitSuccess(false);
  };

  // Find the degree across all programs
  let degree = null;
  let programType = null;

  for (const program of programsData) {
    const foundDegree = program.degrees.find(d => d.id === parseInt(degreeId, 10));
    if (foundDegree) {
      degree = foundDegree;
      programType = program;
      break;
    }
  }

  if (!degree || !programType) {
    return (
      <div className={`degree-details ${isDarkMode ? 'dark-mode' : ''}`}>
        <div className="container">
          <h2>Degree not found</h2>
        </div>
      </div>
    );
  }

  const handleInquire = () => {
    // Simple + reliable: go home and let user use Contact section
    navigate('/');
  };

  return (
    <motion.div
      className={`degree-details ${isDarkMode ? 'dark-mode' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        <motion.div
          className="degree-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.div 
            className="degree-image-container"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.img
              src={imageMap[programType.image]}
              alt={programType.type}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
            />
            <motion.div 
              className="image-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            >
              <div className="overlay-content">
                <motion.div
                  className="program-badge"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1.0, type: "spring", stiffness: 200 }}
                >
                  {programType.type}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="degree-info"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <motion.div className="degree-meta">
              <motion.span 
                className="degree-category"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
              >
                {programType.type}
              </motion.span>
              <motion.span 
                className="degree-level"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.4 }}
              >
                {degree.level || 'Undergraduate'}
              </motion.span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              {degree.name}
            </motion.h1>
            
            <motion.p 
              className="degree-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.4 }}
            >
              {degree.subtitle || `Advance your career with our comprehensive ${programType.type.toLowerCase()} program`}
            </motion.p>
            
            <motion.div 
              className="degree-highlights"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              <div className="highlight-item">
                <div className="highlight-icon">📚</div>
                <div className="highlight-text">
                  <span className="highlight-label">Duration</span>
                  <span className="highlight-value">{degree.duration}</span>
                </div>
              </div>
              <div className="highlight-item">
                <div className="highlight-icon">💰</div>
                <div className="highlight-text">
                  <span className="highlight-label">Tuition</span>
                  <span className="highlight-value">{degree.price}</span>
                </div>
              </div>
              <div className="highlight-item">
                <div className="highlight-icon">🎓</div>
                <div className="highlight-text">
                  <span className="highlight-label">Degree</span>
                  <span className="highlight-value">{degree.credits || '120 Credits'}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="degree-details-grid"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <motion.div
            className="detail-card"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3>Duration</h3>
            <p>{degree.duration}</p>
          </motion.div>

          <motion.div
            className="detail-card"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3>Fees</h3>
            <p className="price">{degree.price}</p>
          </motion.div>

          <motion.div
            className="detail-card full-width"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3>Program Type</h3>
            <p>{programType.type}</p>
          </motion.div>
        </motion.div>

        <motion.div
          className="degree-description-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h2>About This Degree</h2>
          <motion.div
            className="description-card"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <p>{degree.description}</p>
          </motion.div>
        </motion.div>

        <motion.div
          className="action-buttons"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <motion.button
            className="apply-btn"
            onClick={openModal}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Apply Now
          </motion.button>
          <motion.button
            className="inquire-btn"
            onClick={handleInquire}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Inquire
          </motion.button>
        </motion.div>
      </div>

      {/* Application Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>Apply for {degree.name}</h2>
                <button className="close-btn" onClick={closeModal}>×</button>
              </div>

              {submitSuccess ? (
                <motion.div
                  className="success-message"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="success-icon">✓</div>
                  <h3>Application Submitted Successfully!</h3>
                  <p>Thank you for your interest. We'll contact you soon with next steps.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="application-form">
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name *</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={formErrors.fullName ? 'error' : ''}
                      placeholder="Enter your full name"
                    />
                    {formErrors.fullName && <span className="error-text">{formErrors.fullName}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={formErrors.email ? 'error' : ''}
                      placeholder="Enter your email address"
                    />
                    {formErrors.email && <span className="error-text">{formErrors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={formErrors.phone ? 'error' : ''}
                      placeholder="Enter your phone number"
                    />
                    {formErrors.phone && <span className="error-text">{formErrors.phone}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="degreeProgram">Selected Degree Program</label>
                    <input
                      type="text"
                      id="degreeProgram"
                      value={`${degree.name} (${programType.type})`}
                      readOnly
                      className="readonly-field"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message / Additional Notes</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us why you're interested in this program..."
                      rows="4"
                    />
                  </div>

                  {formErrors.submit && (
                    <div className="error-message">
                      {formErrors.submit}
                    </div>
                  )}

                  <div className="form-actions">
                    <button type="button" className="cancel-btn" onClick={closeModal}>
                      Cancel
                    </button>
                    <button type="submit" className="submit-btn" disabled={isSubmitting}>
                      {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DegreeDetails;