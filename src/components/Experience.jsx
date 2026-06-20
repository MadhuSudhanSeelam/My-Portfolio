import { motion } from 'framer-motion';
import { CalendarOutlined, TeamOutlined } from '@ant-design/icons';
import { Row, Col, Typography, Space, Tag } from 'antd';
import { portfolioConfig } from '../data/config';
import './Experience.css';

const { Title, Paragraph, Text } = Typography;

const Experience = () => {
    const { experience } = portfolioConfig;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section id="experience" className="experience-section section-padding">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <Title level={2} className="section-title-antd experience-title">
                        Experience
                    </Title>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <Row gutter={[24, 32]} justify="center">
                        {experience.map((job, index) => (
                            <Col xs={24} sm={24} md={20} lg={16} key={`${job.company}-${index}`}>
                                <motion.div
                                    variants={itemVariants}
                                    className="experience-card"
                                >
                                    <div className="experience-header">
                                        <div className="experience-header-info">
                                            <Title level={4} className="experience-company">
                                                <TeamOutlined className="experience-icon" />
                                                {job.company}
                                            </Title>
                                            <Paragraph className="experience-position">
                                                {job.position}
                                            </Paragraph>
                                        </div>
                                        <Text className="experience-duration">
                                            <CalendarOutlined className="duration-icon" />
                                            {job.duration}
                                        </Text>
                                    </div>

                                    <div className="experience-content">
                                        {job.description.map((desc, idx) => (
                                            <motion.div
                                                key={idx}
                                                className="experience-description"
                                                initial={{ opacity: 0 }}
                                                whileInView={{ opacity: 1 }}
                                                transition={{ delay: 0.1 * idx }}
                                            >
                                                <span className="bullet">•</span>
                                                <Text>{desc}</Text>
                                            </motion.div>
                                        ))}
                                    </div>

                                    <div className="experience-tech">
                                        <Space wrap size={[8, 8]} style={{ width: '100%' }}>
                                            {job.tech.map(tech => (
                                                <Tag
                                                    key={tech}
                                                    className="tech-tag"
                                                    color="processing"
                                                >
                                                    {tech}
                                                </Tag>
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

export default Experience;
