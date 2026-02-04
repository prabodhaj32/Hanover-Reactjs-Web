import { useEffect, useState, useCallback } from 'react';
import './Navbar.css';
import { motion } from 'framer-motion';
import logo from '../../assets/logo.png';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import menu_icon from '../../assets/menu-icon.png';
import { useTheme } from '../../context/ThemeContext';

// Navigation links configuration
const NAV_LINKS = [
  { to: 'hero', label: 'Home', offset: 0 },
  { to: 'program', label: 'Program', offset: -100 },
  { to: 'about', label: 'About us', offset: -100 },
  { to: 'campus', label: 'Campus', offset: -100 },
  { to: 'testimonials', label: 'Testimonials', offset: -100 },
  { to: 'faq', label: 'FAQ', offset: -100 },
  { to: 'contact', label: 'Contact us', offset: -100, isButton: true }
];

// Scroll threshold for sticky navbar
const STICKY_THRESHOLD = 100;

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  // Handle scroll for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > STICKY_THRESHOLD);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu when link is clicked
  const handleLinkClick = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Handle navigation - navigate to home first if not on home page
  const handleNavClick = useCallback((link) => {
    if (!isHomePage) {
      navigate('/');
      // Wait for navigation and DOM update before scrolling
      setTimeout(() => {
        const element = document.getElementById(link.to);
        if (element) {
          const offset = link.offset || -100;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition + offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 200);
    }
  }, [isHomePage, navigate]);

  // Toggle mobile menu
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  // Build navbar class names
  const navbarClasses = [
    'navbar-wrapper',
    isSticky && 'sticky',
    isDarkMode && 'dark-mode'
  ].filter(Boolean).join(' ');

  return (
    <motion.nav
      className={navbarClasses}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="navbar-container">
        {/* Logo */}
        <RouterLink to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <motion.img
            src={logo}
            alt="Hanover School Logo"
            className="logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          />
        </RouterLink>

        {/* Navigation Links */}
        <ul className={isMobileMenuOpen ? 'mobile-menu-open' : 'hide-mobile-menu'}>
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              {isHomePage ? (
                <ScrollLink
                  to={link.to}
                  smooth={true}
                  offset={link.offset}
                  duration={500}
                  spy={true}
                  activeClass="active"
                  className={link.isButton ? 'btn' : ''}
                  onClick={handleLinkClick}
                >
                  {link.label}
                </ScrollLink>
              ) : (
                <RouterLink
                  to="/"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link);
                    handleLinkClick();
                  }}
                  className={link.isButton ? 'btn' : ''}
                >
                  {link.label}
                </RouterLink>
              )}
            </li>
          ))}
        </ul>

        {/* Right Side Controls */}
        <div className="nav-controls">
          <motion.button
            onClick={toggleTheme}
            className="theme-toggle"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </motion.button>
          <motion.button
            onClick={toggleMobileMenu}
            className="menu-toggle"
            whileTap={{ scale: 0.9 }}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <img src={menu_icon} alt="" className="menu-icon" aria-hidden="true" />
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
