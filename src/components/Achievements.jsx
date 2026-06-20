import { motion } from 'framer-motion';
import { TrophyOutlined } from '@ant-design/icons';
import { Row, Col, Typography, Card, Space } from 'antd';
import { portfolioConfig } from '../data/config';
import './Achievements.css';

const { Title, Paragraph, Text } = Typography;

const Achievements = () => {
    const { achievements } = portfolioConfig;

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
        },
        hover: {
            y: -5,
            transition: { duration: 0.3 }
        }
    };

    return (
        <section id="achievements" className="achievements-section section-padding">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <Title level={2} className="section-title-antd achievements-title">
                        <TrophyOutlined className="achievements-icon-title" />
                        Achievements
                    </Title>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <Row gutter={[24, 24]} justify="center">
                        {achievements.map((achievement, index) => (
                            <Col xs={24} sm={12} md={10} lg={8} key={`${achievement.title}-${index}`}>
                                <motion.div
                                    variants={cardVariants}
                                    whileHover="hover"
                                >
                                    <Card
                                        hoverable
                                        className="achievement-card"
                                        bordered={false}
                                    >
                                        <div className="achievement-card-inner">
                                            <motion.div
                                                className="achievement-icon-wrapper"
                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                            >
                                                <TrophyOutlined className="achievement-icon" />
                                            </motion.div>

                                            <Title level={5} className="achievement-title">
                                                {achievement.title}
                                            </Title>

                                            <Paragraph className="achievement-description">
                                                {achievement.description}
                                            </Paragraph>
                                        </div>
                                    </Card>
                                </motion.div>
                            </Col>
                        ))}
                    </Row>
                </motion.div>
            </div>
        </section>
    );
};

export default Achievements;
