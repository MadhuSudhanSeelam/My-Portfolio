import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { portfolioConfig } from '../data/config';

const Hero = () => {
    const { name, roles, tagline } = portfolioConfig.profile;
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
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="hero-content"
                >
                    <h2 className="sub-title">Hi, I'm</h2>
                    <h1 className="main-title">{name}</h1>
                    <h3 className="role-text">
                        <span className="typing">{displayText}</span>
                        <span className="cursor">|</span>
                    </h3>
                    <p className="hero-tagline">
                        {tagline}
                    </p>
                    <div className="hero-btns">
                        <a href="#contact" className="btn primary-btn">Get In Touch</a>
                        <a href="#projects" className="btn secondary-btn">View My Work</a>
                    </div>
                </motion.div>
            </div>
            <div className="glow-effect"></div>
        </section>
    );
};

export default Hero;
