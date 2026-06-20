import { motion } from 'framer-motion';
import { SafetyOutlined, LinkOutlined, CalendarOutlined } from '@ant-design/icons';
import { Row, Col, Typography, Card, Button, Space, Tag } from 'antd';
import { portfolioConfig } from '../data/config';
import './Certifications.css';

const { Title, Paragraph, Text } = Typography;

const Certifications = () => {
    const { certifications } = portfolioConfig;

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
        <section id="certifications" className="certifications-section section-padding">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <Title level={2} className="section-title-antd certifications-title">
                        <SafetyOutlined className="certifications-icon-title" />
                        Certifications
                    </Title>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <Row gutter={[24, 24]} justify="center">
                        {certifications.map((cert, index) => (
                            <Col xs={24} sm={24} md={20} lg={16} key={`${cert.title}-${index}`}>
                                <motion.div
                                    variants={cardVariants}
                                    whileHover="hover"
                                >
                                    <Card
                                        hoverable
                                        className="certification-card"
                                        bordered={false}
                                    >
                                        <div className="certification-card-content">
                                            <div className="certification-header">
                                                <div className="certification-icon-wrapper">
                                                    <motion.div
                                                        className="certification-icon"
                                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                                    >
                                                        <SafetyOutlined />
                                                    </motion.div>
                                                </div>

                                                <div className="certification-info">
                                                    <Title level={4} className="certification-title">
                                                        {cert.title}
                                                    </Title>
                                                    <Space direction="vertical" size={4}>
                                                        <Tag color="blue" className="issuer-tag">
                                                            {cert.issuer}
                                                        </Tag>
                                                        <Text className="certification-date">
                                                            <CalendarOutlined className="date-icon" />
                                                            {cert.date}
                                                        </Text>
                                                    </Space>
                                                </div>
                                            </div>

                                            <div className="certification-footer">
                                                <Button
                                                    type="link"
                                                    href={cert.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    icon={<LinkOutlined />}
                                                    className="verify-btn"
                                                >
                                                    View Credential
                                                </Button>
                                            </div>
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

export default Certifications;
