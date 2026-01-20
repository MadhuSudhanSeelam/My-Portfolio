import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { portfolioConfig } from '../data/config';

const About = () => {
    const { bio, stats } = portfolioConfig.about;
    const { resumeUrl } = portfolioConfig.profile;

    return (
        <section id="about" className="about-section section-padding">
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-title"
                >
                    About Me
                </motion.h2>
                <div className="about-grid">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="about-text"
                    >
                        {bio.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                        <div className="personal-info">
                            {stats.map((stat, index) => (
                                <div className="info-item" key={index}>
                                    <span className="label">{stat.label}:</span>
                                    <span className="value">{stat.value}</span>
                                </div>
                            ))}
                        </div>
                        {resumeUrl && resumeUrl !== '#' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                style={{ marginTop: '2rem' }}
                            >
                                <a
                                    href={resumeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn primary-btn"
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                                >
                                    <Download size={18} />
                                    Download Resume
                                </a>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
