import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GithubOutlined, LinkedinOutlined, MailOutlined } from '@ant-design/icons';
import { Row, Col, Typography, Button, Space, Grid } from 'antd';
import { portfolioConfig } from '../data/config';
import './Hero.css';

const { Title, Paragraph, Text } = Typography;
const { useBreakpoint } = Grid;

const Hero = () => {
    const { name, roles, tagline, profileImage, github, linkedin, email } = portfolioConfig.profile;
    const [roleIndex, setRoleIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const screens = useBreakpoint();

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

    const isMobile = !screens.md;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <section id="hero" className="hero-section-antd">
            <div className="container">
                <Row
                    gutter={[32, 48]}
                    align="middle"
                    justify="center"
                    style={{ minHeight: '80vh', padding: '100px 0' }}
                >
                    {/* Hero Content */}
                    <Col xs={24} md={12} order={isMobile ? 2 : 1}>
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            style={{ textAlign: isMobile ? 'center' : 'left' }}
                        >
                            <motion.div variants={itemVariants}>
                                <Text className="sub-title-antd">Hi, I'm</Text>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Title level={1} className="main-title-antd">
                                    <span className="name-part">MadhuSudhan</span><span className="name-break"> </span><span className="name-part">Seelam</span>
                                </Title>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Title level={3} className="role-text-antd">
                                    <span className="typing">{displayText}</span>
                                    <span className="cursor">|</span>
                                </Title>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Paragraph className="hero-tagline-antd">
                                    {tagline}
                                </Paragraph>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Space size="middle" wrap={isMobile} className="hero-btns-antd">
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Button type="primary" size="large" href="#projects" shape="round">
                                            View My Work
                                        </Button>
                                    </motion.div>
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Button size="large" href="#contact" shape="round" ghost className="secondary-btn-antd">
                                            Get In Touch
                                        </Button>
                                    </motion.div>
                                </Space>
                            </motion.div>

                            <motion.div variants={itemVariants} className="social-links-antd">
                                <Space size="large">
                                    {github && (
                                        <motion.a
                                            href={github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="social-icon"
                                            whileHover={{ y: -5, color: '#3a86ff' }}
                                        >
                                            <GithubOutlined style={{ fontSize: '24px' }} />
                                        </motion.a>
                                    )}
                                    {linkedin && (
                                        <motion.a
                                            href={linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="social-icon"
                                            whileHover={{ y: -5, color: '#3a86ff' }}
                                        >
                                            <LinkedinOutlined style={{ fontSize: '24px' }} />
                                        </motion.a>
                                    )}
                                    {email && (
                                        <motion.a
                                            href={`mailto:${email}`}
                                            className="social-icon"
                                            whileHover={{ y: -5, color: '#3a86ff' }}
                                        >
                                            <MailOutlined style={{ fontSize: '24px' }} />
                                        </motion.a>
                                    )}
                                </Space>
                            </motion.div>
                        </motion.div>
                    </Col>

                    {/* Profile Image */}
                    <Col xs={24} md={12} order={isMobile ? 1 : 2} style={{ display: 'flex', justifyContent: 'center' }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="profile-wrapper-antd"
                        >
                            {profileImage && (
                                <div className="profile-container-antd">
                                    <motion.div
                                        className="profile-img-morphed"
                                        animate={{
                                            borderRadius: [
                                                "30% 70% 70% 30% / 30% 30% 70% 70%",
                                                "58% 42% 75% 25% / 76% 46% 54% 24%",
                                                "50% 50% 33% 67% / 55% 27% 73% 45%",
                                                "33% 67% 58% 42% / 63% 68% 32% 37%",
                                                "30% 70% 70% 30% / 30% 30% 70% 70%"
                                            ]
                                        }}
                                        transition={{
                                            duration: 12,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    >
                                        <img src={profileImage} alt={name} />
                                    </motion.div>
                                    <motion.div
                                        className="blob-decorator blue"
                                        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                                        transition={{ duration: 15, repeat: Infinity }}
                                    ></motion.div>
                                    <motion.div
                                        className="blob-decorator cyan"
                                        animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
                                        transition={{ duration: 18, repeat: Infinity }}
                                    ></motion.div>
                                </div>
                            )}
                        </motion.div>
                    </Col>
                </Row>
            </div>
            <motion.div
                className="glow-effect-antd"
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
                transition={{ duration: 8, repeat: Infinity }}
            ></motion.div>
        </section>
    );
};

export default Hero;
