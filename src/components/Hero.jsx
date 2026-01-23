import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { portfolioConfig } from '../data/config';

const Hero = () => {
    const { name, roles, tagline, profileImage, github, linkedin, email } = portfolioConfig.profile;
    const [roleIndex, setRoleIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 2000;

    useEffect(() => {
        let timer;
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            timer = setTimeout(() => {
                setDisplayText(currentRole.substring(0, displayText.length - 1));
            }, deletingSpeed);
        } else {
            timer = setTimeout(() => {
                setDisplayText(currentRole.substring(0, displayText.length + 1));
            }, typingSpeed);
        }

        if (!isDeleting && displayText === currentRole) {
            timer = setTimeout(() => setIsDeleting(true), pauseTime);
        } else if (isDeleting && displayText === '') {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
        }

        return () => clearTimeout(timer);
    }, [displayText, isDeleting, roleIndex, roles]);

    return (
        <section id="hero" className="hero-section">
            <div className="container">
                <div className="hero-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '4rem',
                    alignItems: 'center',
                    maxWidth: '1200px',
                    margin: '0 auto',
                    minHeight: '80vh'
                }}>
                    {/* Hero Content (Left) */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="hero-content"
                        style={{ textAlign: 'left', alignItems: 'flex-start' }}
                    >
                        <h2 className="sub-title" style={{ color: 'var(--accent-cyan)', fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 600 }}>Hi, I'm</h2>
                        <h1 className="main-title" style={{ fontSize: '4rem', lineHeight: 1.1, marginBottom: '1rem' }}>{name}</h1>
                        <h3 className="role-text" style={{ fontSize: '1.8rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                            <span className="typing">{displayText}</span>
                            <span className="cursor">|</span>
                        </h3>
                        <p className="hero-tagline" style={{ fontSize: '1.1rem', maxWidth: '500px', marginBottom: '2.5rem', lineHeight: 1.6 }}>
                            {tagline}
                        </p>

                        <div className="hero-btns" style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem' }}>
                            <a href="#projects" className="btn primary-btn">View My Work</a>
                            <a href="#contact" className="btn secondary-btn">Get In Touch</a>
                        </div>

                        {/* Social Links */}
                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                            {github && (
                                <a href={github} target="_blank" rel="noopener noreferrer" className="social-icon">
                                    <Github size={24} />
                                </a>
                            )}
                            {linkedin && (
                                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="social-icon">
                                    <Linkedin size={24} />
                                </a>
                            )}
                            {email && (
                                <a href={`mailto:${email}`} className="social-icon">
                                    <Mail size={24} />
                                </a>
                            )}
                        </div>
                    </motion.div>

                    {/* Profile Picture (Right) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, x: 50 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
                    >
                        {profileImage && (
                            <div className="profile-container">
                                <div className="profile-img-wrapper" style={{
                                    width: '350px',
                                    height: '350px',
                                    borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                                    overflow: 'hidden',
                                    border: '4px solid var(--glass-border)',
                                    boxShadow: '0 20px 60px rgba(58, 134, 255, 0.2)',
                                    background: 'var(--bg-card)',
                                    position: 'relative',
                                    animation: 'morph 8s ease-in-out infinite'
                                }}>
                                    <img
                                        src={profileImage}
                                        alt={name}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                        onError={(e) => { e.target.style.display = 'none'; }}
                                    />
                                </div>
                                {/* Decorative elements */}
                                <div style={{
                                    position: 'absolute',
                                    top: '-20px',
                                    right: '-20px',
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
                                    filter: 'blur(40px)',
                                    opacity: 0.5,
                                    zIndex: -1
                                }}></div>
                                <div style={{
                                    position: 'absolute',
                                    bottom: '-20px',
                                    left: '-20px',
                                    width: '150px',
                                    height: '150px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))',
                                    filter: 'blur(50px)',
                                    opacity: 0.4,
                                    zIndex: -1
                                }}></div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
            <div className="glow-effect"></div>

            <style>{`
                @keyframes morph {
                    0% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
                    25% { border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%; }
                    50% { border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%; }
                    75% { border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%; }
                    100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
                }

                .social-icon {
                    color: var(--text-secondary);
                    transition: all 0.3s ease;
                    padding: 10px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid var(--glass-border);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .social-icon:hover {
                    color: var(--accent-blue);
                    background: rgba(58, 134, 255, 0.1);
                    transform: translateY(-5px);
                    box-shadow: 0 5px 15px rgba(58, 134, 255, 0.2);
                }
                
                @media (max-width: 992px) {
                    .hero-grid {
                        grid-template-columns: 1fr !important;
                        text-align: center;
                        gap: 3rem !important;
                    }
                    .hero-content {
                        order: 2;
                        text-align: center !important;
                        align-items: center !important;
                    }
                    .profile-container {
                        order: 1;
                        margin: 0 auto;
                    }
                    .hero-btns, .hero-content > div:last-child {
                        justify-content: center;
                    }
                    .main-title {
                        font-size: clamp(2rem, 5vw, 3rem) !important;
                        white-space: nowrap;
                    }
                }
            `}</style>
        </section>
    );
};

export default Hero;
