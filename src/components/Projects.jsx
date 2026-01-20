import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { portfolioConfig } from '../data/config';

const Projects = () => {
    const { projects } = portfolioConfig;

    return (
        <section id="projects" className="projects-section section-padding">
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-title"
                >
                    Featured Projects
                </motion.h2>
                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="project-card"
                        >
                            <div className="project-img-placeholder">
                                <img src={project.image} alt={project.title} />
                                <div className="project-overlay">
                                    <div className="overlay-links">
                                        <a href={project.demo} target="_blank" rel="noreferrer"><ExternalLink size={20} /> Demo</a>
                                        <a href={project.code} target="_blank" rel="noreferrer"><Github size={20} /> Code</a>
                                    </div>
                                </div>
                            </div>
                            <div className="project-info">
                                <h3>{project.title}</h3>
                                <p>{project.desc}</p>
                                <div className="project-tags">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
