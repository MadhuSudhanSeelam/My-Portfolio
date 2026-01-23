import { motion } from 'framer-motion';
import { LayoutOutlined, CloudServerOutlined, RocketOutlined } from '@ant-design/icons';
import { Row, Col, Typography, Space } from 'antd';
import { portfolioConfig } from '../data/config';
import './Skills.css';

const { Title } = Typography;

const categoryIcons = {
    Frontend: <LayoutOutlined />,
    Backend: <CloudServerOutlined />,
    "Design & Tools": <RocketOutlined />
};

const Skills = () => {
    const { skillCategories } = portfolioConfig;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
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
            scale: 1.08,
            opacity: 1,
            transition: { type: "spring", stiffness: 400, damping: 10 }
        },
        tap: { scale: 0.95 }
    };

    return (
        <section id="skills" className="skills-section-balanced section-padding">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <Title level={2} className="skills-title-white">My Skills</Title>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <Row gutter={[24, 24]} justify="center" className="skills-row-balanced">
                        {skillCategories.map((cat, index) => (
                            <Col xs={24} sm={24} md={8} key={cat.title}>
                                <motion.div
                                    variants={cardVariants}
                                    className="skill-card-balanced"
                                    style={{ '--accent-color': cat.color }}
                                >
                                    <div className="card-icon-wrapper-balanced">
                                        <motion.div
                                            className="icon-circle-balanced"
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                        >
                                            {categoryIcons[cat.title] || <LayoutOutlined />}
                                        </motion.div>
                                    </div>

                                    <Title level={4} className="card-title-balanced">{cat.title}</Title>

                                    <div className="skill-badges-balanced">
                                        <Space wrap size={[8, 10]} style={{ width: '100%', justifyContent: 'center' }}>
                                            {cat.skills.map(skill => (
                                                <motion.span
                                                    key={skill}
                                                    className="skill-badge-balanced"
                                                    variants={badgeVariants}
                                                    initial="initial"
                                                    whileHover="hover"
                                                    whileTap="tap"
                                                >
                                                    {skill}
                                                </motion.span>
                                            ))}
                                        </Space>
                                    </div>
                                </motion.div>
                            </Col>
                        ))}
                    </Row>
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
