import { motion } from 'framer-motion';
import { Row, Col, Typography } from 'antd';
import { portfolioConfig } from '../data/config';
import './About.css';

const { Title, Paragraph, Text } = Typography;

const About = () => {
    const { bio, stats } = portfolioConfig.about;

    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <section id="about" className="about-section-minimal section-padding">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <Title level={2} className="about-title-gradient">About Me</Title>
                </motion.div>

                <Row justify="center">
                    <Col xs={24} md={20} lg={18}>
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className="about-content-minimal"
                        >
                            {bio.map((paragraph, index) => (
                                <motion.div key={index} variants={itemVariants}>
                                    <Paragraph className="about-paragraph-minimal">
                                        {paragraph}
                                    </Paragraph>
                                </motion.div>
                            ))}

                            <motion.div variants={itemVariants} className="stats-row-minimal">
                                {stats.map((stat, index) => (
                                    <div key={index} className="stat-inline-minimal">
                                        <Text className="stat-label-colored">{stat.label}:</Text>
                                        <Text className="stat-value-white">{stat.value}</Text>
                                    </div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </Col>
                </Row>
            </div>
        </section>
    );
};

export default About;
