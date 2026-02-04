import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import './Contact.css';
import msg_icon from '../../assets/msg-icon.png';
import mail_icon from '../../assets/mail-icon.png';
import phone_icon from '../../assets/phone-icon.png';
import location_icon from '../../assets/location-icon.png';
import white_arrow from '../../assets/white-arrow.png';
import { useTheme } from '../../context/ThemeContext';

const Contact = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
    const [result, setResult] = React.useState("");
    const { isDarkMode } = useTheme();

    const onSubmit = async (data) => {
        setResult("Sending....");
        const formData = new FormData();

        // Append form data
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });

        formData.append("access_key", "6af074c2-1af7-4536-a12f-b2aa6cc170b2");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const responseData = await response.json();

            if (responseData.success) {
                setResult("Form Submitted Successfully");
                reset();
                setTimeout(() => setResult(""), 5000);
            } else {
                console.log("Error", responseData);
                setResult(responseData.message || "An error occurred. Please try again.");
            }
        } catch (error) {
            console.error("Submission error:", error);
            setResult("An error occurred. Please try again.");
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

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <motion.section
            className={`contact ${isDarkMode ? 'dark-mode' : ''}`}
            id="contact"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
        >
            <motion.div className="contact-col" variants={itemVariants}>
                <motion.h3
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                >
                    Send us a message <img src={msg_icon} alt="" aria-hidden="true" />
                </motion.h3>
                <p>
                    We're here to help! Whether you have questions about our programs, admissions, or campus life, 
                    feel free to reach out to us. At Hanover School, we are committed to providing you with 
                    the information and support you need to make informed decisions about your education and future.
                </p>
                <ul>
                    <motion.li
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                    >
                        <img src={mail_icon} alt="Email" />
                        <a href="mailto:info@hanoverschool.edu">info@hanoverschool.edu</a>
                    </motion.li>
                    <motion.li
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                    >
                        <img src={phone_icon} alt="Phone" />
                        <a href="tel:0811253662">081-1253662</a>
                    </motion.li>
                    <motion.li
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                    >
                        <img src={location_icon} alt="Location" />
                        <span>
                            Hanover School<br />
                            123 Innovation Avenue<br />
                            Learning City, Knowledge State
                        </span>
                    </motion.li>
                </ul>
            </motion.div>

            <motion.div className="contact-col" variants={itemVariants}>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="form-group">
                        <label htmlFor="name">Your name</label>
                        <input
                            id="name"
                            type="text"
                            {...register('name', {
                                required: 'Name is required',
                                minLength: { value: 2, message: 'Name must be at least 2 characters' }
                            })}
                            placeholder='Enter your name'
                            aria-invalid={errors.name ? 'true' : 'false'}
                            aria-describedby={errors.name ? 'name-error' : undefined}
                        />
                        {errors.name && (
                            <span id="name-error" className="error" role="alert">
                                {errors.name.message}
                            </span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            id="phone"
                            type="tel"
                            {...register('phone', {
                                required: 'Phone number is required',
                                pattern: {
                                    value: /^[\+]?[1-9][\d]{0,15}$/,
                                    message: 'Please enter a valid phone number'
                                }
                            })}
                            placeholder='Enter your mobile number'
                            aria-invalid={errors.phone ? 'true' : 'false'}
                            aria-describedby={errors.phone ? 'phone-error' : undefined}
                        />
                        {errors.phone && (
                            <span id="phone-error" className="error" role="alert">
                                {errors.phone.message}
                            </span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Write your message here</label>
                        <textarea
                            id="message"
                            {...register('message', {
                                required: 'Message is required',
                                minLength: { value: 10, message: 'Message must be at least 10 characters' }
                            })}
                            rows="6"
                            placeholder='Enter your message'
                            aria-invalid={errors.message ? 'true' : 'false'}
                            aria-describedby={errors.message ? 'message-error' : undefined}
                        />
                        {errors.message && (
                            <span id="message-error" className="error" role="alert">
                                {errors.message.message}
                            </span>
                        )}
                    </div>

                    <motion.button
                        type='submit'
                        className='btn dark-btn'
                        disabled={isSubmitting}
                        whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                        whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    >
                        {isSubmitting ? 'Sending...' : 'Submit now'} 
                        {!isSubmitting && <img src={white_arrow} alt="" aria-hidden="true" />}
                    </motion.button>
                </form>
                {result && (
                    <motion.span
                        className={result.includes('Successfully') ? 'success' : 'error'}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        role="alert"
                    >
                        {result}
                    </motion.span>
                )}
            </motion.div>
        </motion.section>
    );
};

export default Contact;