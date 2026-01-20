import { motion } from 'framer-motion';
import { Layout, Server, Palette } from 'lucide-react';
import { portfolioConfig } from '../data/config';

const categoryIcons = {
    Frontend: <Layout className="skill-icon" />,
    Backend: <Server className="skill-icon" />,
    "Design & Tools": <Palette className="skill-icon" />
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const badgeVariants = {
    initial: { scale: 1, opacity: 0.8 },
    hover: {
        scale: 1.1,
        opacity: 1,
        transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
};

const Skills = () => {
    const { skillCategories } = portfolioConfig;

    return (
        <section id="skills" className="skills-section section-padding">
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-title"
                >
                    My Skills
                </motion.h2>

                <motion.div
                    className="skills-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {skillCategories.map((cat) => (
                        <motion.div
                            key={cat.title}
                            variants={cardVariants}
                            className="skill-card-v2"
                            style={{ '--category-color': cat.color }}
                        >
                            <div className="card-header">
                                <span className="icon-wrapper">
                                    {categoryIcons[cat.title] || <Layout className="skill-icon" />}
                                </span>
                                <h3>{cat.title}</h3>
                            </div>
                            <div className="skill-badges-v2">
                                {cat.skills.map(skill => (
                                    <motion.span
                                        key={skill}
                                        className="interactive-badge"
                                        variants={badgeVariants}
                                        initial="initial"
                                        whileHover="hover"
                                        whileTap="tap"
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
