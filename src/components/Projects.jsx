import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExportOutlined, GithubOutlined } from '@ant-design/icons';
import { Row, Col, Typography, Card, Tag, Button, Space, Image } from 'antd';
import { portfolioConfig } from '../data/config';
import './Projects.css';

const { Title, Paragraph } = Typography;

const Projects = () => {
    const { projects } = portfolioConfig;
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <section id="projects" className="projects-section-antd section-padding">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center' }}
                >
                    <Title level={2} className="section-title-antd">Featured Projects</Title>
                </motion.div>

                <Row gutter={[32, 32]} justify="center">
                    {projects.map((project, index) => (
                        <Col xs={24} sm={12} lg={8} key={project.title}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <Card
                                    hoverable
                                    className="project-card-antd"
                                    cover={
                                        <div className="project-image-container-antd">
                                            <motion.div
                                                animate={{ scale: hoveredIndex === index ? 1.1 : 1 }}
                                                transition={{ duration: 0.4 }}
                                                style={{ height: '100%' }}
                                            >
                                                <Image
                                                    src={project.image}
                                                    alt={project.title}
                                                    preview={false}
                                                    className="project-cover-img-antd"
                                                />
                                            </motion.div>

                                            <AnimatePresence>
                                                {hoveredIndex === index && (
                                                    <motion.div
                                                        className="project-hover-overlay-antd-dynamic"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        <motion.div
                                                            initial={{ y: 20, opacity: 0 }}
                                                            animate={{ y: 0, opacity: 1 }}
                                                            transition={{ delay: 0.1 }}
                                                        >
                                                            <Space>
                                                                <Button
                                                                    type="primary"
                                                                    shape="round"
                                                                    icon={<ExportOutlined />}
                                                                    href={project.demo}
                                                                    target="_blank"
                                                                >
                                                                    Demo
                                                                </Button>
                                                                <Button
                                                                    shape="round"
                                                                    icon={<GithubOutlined />}
                                                                    href={project.code}
                                                                    target="_blank"
                                                                    ghost
                                                                    style={{ color: 'white', borderColor: 'white' }}
                                                                >
                                                                    Code
                                                                </Button>
                                                            </Space>
                                                        </motion.div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            {/* Mobile always-on overlay gradient */}
                                            <div className="project-mobile-overlay-antd"></div>
                                        </div>
                                    }
                                >
                                    <div className="project-card-body-antd">
                                        <Title level={4} className="project-title-text-antd">{project.title}</Title>
                                        <Paragraph
                                            ellipsis={{ rows: 2, expandable: false }}
                                            className="project-desc-text-antd"
                                        >
                                            {project.desc}
                                        </Paragraph>
                                        <div className="project-tags-antd">
                                            <Space wrap size={[4, 8]}>
                                                {project.tags.map(tag => (
                                                    <Tag key={tag} className="tech-tag-antd">{tag}</Tag>
                                                ))}
                                            </Space>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        </Col>
                    ))}
                </Row>
            </div>
        </section>
    );
};

export default Projects;
