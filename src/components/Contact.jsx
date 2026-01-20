import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Phone, Send, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react';
import { portfolioConfig } from '../data/config';

const Contact = () => {
    const { email: EMAIL_ADDRESS, whatsapp: WHATSAPP_NUMBER, github: GITHUB_URL, linkedin: LINKEDIN_URL, googleSheetScriptUrl: SCRIPT_URL } = portfolioConfig.profile;
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle, sending, success, error, config_error



    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            // Use Script URL if available, otherwise fallback to FormSubmit
            const endpoint = SCRIPT_URL || `https://formsubmit.co/ajax/${EMAIL_ADDRESS}`;

            // If using Google Script, we use a different structure or just FormData
            const response = await fetch(endpoint, {
                method: "POST",
                body: SCRIPT_URL ? JSON.stringify(formData) : JSON.stringify({
                    ...formData,
                    name: `${formData.firstName} ${formData.lastName}`.trim(),
                    _subject: `New Portfolio Message from ${formData.firstName} ${formData.lastName}`
                }),
                headers: SCRIPT_URL ? {
                    "Content-Type": "text/plain;charset=utf-8",
                } : {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });

            const result = await response.json();
            console.log("Submission Result:", result);

            if (response.ok && (result.success === "true" || result.success === true)) {
                setStatus('success');
                setFormData({ firstName: '', lastName: '', email: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                console.error("Submission Error Details:", result);
                setStatus('error');
            }
        } catch (error) {
            console.error("Form submission catch error:", error);
            setStatus('error');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const contactLinks = [
        { icon: <Mail />, href: `mailto:${EMAIL_ADDRESS}`, label: "Email", color: "var(--accent-blue)" },
        { icon: <MessageCircle />, href: `https://wa.me/${WHATSAPP_NUMBER}`, label: "WhatsApp", color: "#25D366" },
        { icon: <Phone />, href: `tel:+${WHATSAPP_NUMBER}`, label: "Call", color: "var(--accent-cyan)" },
        { icon: <Github />, href: GITHUB_URL, label: "GitHub", color: "#fff" },
        { icon: <Linkedin />, href: LINKEDIN_URL, label: "LinkedIn", color: "#0077b5" }
    ];

    return (
        <section id="contact" className="contact-section section-padding">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="contact-header"
                >
                    <h2 className="section-title">Get In Touch</h2>
                    <p className="section-subtitle">Have a project in mind or just want to say hi? Feel free to reach out!</p>
                </motion.div>

                <div className="contact-container-minimal">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="contact-icons-row"
                    >
                        {contactLinks.map((link, index) => (
                            <motion.a
                                key={link.label}
                                href={link.href}
                                target={link.href.startsWith('http') ? "_blank" : "_self"}
                                rel="noreferrer"
                                className="contact-icon-btn"
                                whileHover={{ scale: 1.1, translateY: -5 }}
                                whileTap={{ scale: 0.95 }}
                                style={{ '--hover-color': link.color }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                {link.icon}
                                <span className="tooltip">{link.label}</span>
                            </motion.a>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="contact-form-minimal"
                    >
                        {status === 'success' ? (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="success-message"
                            >
                                <CheckCircle size={48} color="#25D366" />
                                <h3>Thank you!</h3>
                                <p>Your message has been sent successfully. I'll get back to you soon.</p>
                                <button onClick={() => setStatus('idle')} className="btn secondary-btn" style={{ marginTop: '1rem' }}>Send another</button>
                            </motion.div>
                        ) : (
                            <form className="minimal-form" onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-row">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <textarea
                                    name="message"
                                    placeholder="Write your message here..."
                                    rows="4"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <button
                                        type="submit"
                                        className={`btn primary-btn submit-btn-minimal ${status}`}
                                        disabled={status === 'sending'}
                                    >
                                        {status === 'idle' && <><Send size={18} style={{ marginRight: '8px' }} /> Send Message</>}
                                        {status === 'sending' && "Sending..."}
                                        {status === 'error' && "Error! Try again"}
                                        {status === 'config_error' && "Setup Required"}
                                    </button>

                                    {status === 'config_error' && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="config-error-notice"
                                        >
                                            <AlertCircle size={16} />
                                            <span>Developer: Please update the <code>EMAIL_ADDRESS</code> in <code>config.js</code> to enable form delivery.</span>
                                        </motion.div>
                                    )}

                                    {status === 'error' && (
                                        <p style={{ color: '#ff4d4d', fontSize: '0.9rem', textAlign: 'center' }}>
                                            Something went wrong. Please check your internet or try again later.
                                        </p>
                                    )}
                                </div>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
