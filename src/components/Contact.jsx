import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    MailOutlined,
    GithubOutlined,
    LinkedinOutlined,
    PhoneOutlined,
    SendOutlined,
    WhatsAppOutlined,
    CheckCircleFilled,
    ExclamationCircleFilled
} from '@ant-design/icons';
import { Row, Col, Typography, Form, Input, Button, Space, Tooltip, message } from 'antd';
import { portfolioConfig } from '../data/config';
import './Contact.css';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const Contact = () => {
    const {
        email: EMAIL_ADDRESS,
        whatsapp: WHATSAPP_NUMBER,
        github: GITHUB_URL,
        linkedin: LINKEDIN_URL,
        googleSheetScriptUrl: SCRIPT_URL
    } = portfolioConfig.profile;

    const [status, setStatus] = useState('idle'); // idle, sending, success, error
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        setStatus('sending');

        try {
            const endpoint = SCRIPT_URL || `https://formsubmit.co/ajax/${EMAIL_ADDRESS}`;

            const response = await fetch(endpoint, {
                method: "POST",
                body: SCRIPT_URL ? JSON.stringify(values) : JSON.stringify({
                    ...values,
                    _subject: `New Portfolio Message from ${values.firstName} ${values.lastName}`
                }),
                headers: SCRIPT_URL ? {
                    "Content-Type": "text/plain;charset=utf-8",
                } : {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });

            const result = await response.json();

            if (response.ok && (result.success === "true" || result.success === true)) {
                setStatus('success');
                message.success('Message sent successfully!');
                form.resetFields();
            } else {
                setStatus('error');
                message.error('Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error("Form submission error:", error);
            setStatus('error');
            message.error('An error occurred. Please try again.');
        }
    };

    const contactLinks = [
        { icon: <MailOutlined />, href: `mailto:${EMAIL_ADDRESS}`, label: "Email", color: "#3a86ff" },
        { icon: <WhatsAppOutlined />, href: `https://wa.me/${WHATSAPP_NUMBER}`, label: "WhatsApp", color: "#25D366" },
        { icon: <PhoneOutlined />, href: `tel:+${WHATSAPP_NUMBER}`, label: "Call", color: "#00f5d4" },
        { icon: <GithubOutlined />, href: GITHUB_URL, label: "GitHub", color: "#ffffff" },
        { icon: <LinkedinOutlined />, href: LINKEDIN_URL, label: "LinkedIn", color: "#0077b5" }
    ];

    return (
        <section id="contact" className="contact-section-antd section-padding">
            <div className="container">
                <Row justify="center">
                    <Col xs={24} md={18} lg={12}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            style={{ textAlign: 'center', marginBottom: '4rem' }}
                        >
                            <Title level={2} className="contact-title-white">Get In Touch</Title>
                            <Paragraph className="section-subtitle-antd">
                                Have a project in mind or just want to say hi? Feel free to reach out!
                            </Paragraph>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="contact-links-wrapper-antd"
                        >
                            <Space size={[16, 16]} wrap justify="center" style={{ width: '100%', justifyContent: 'center', marginBottom: '3rem' }}>
                                {contactLinks.map((link) => (
                                    <Tooltip title={link.label} key={link.label}>
                                        <Button
                                            shape="circle"
                                            icon={link.icon}
                                            size="large"
                                            href={link.href}
                                            target="_blank"
                                            className="contact-icon-btn-antd"
                                            style={{ '--hover-color': link.color }}
                                        />
                                    </Tooltip>
                                ))}
                            </Space>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="contact-form-card-antd"
                        >
                            {status === 'success' ? (
                                <div className="success-state-antd">
                                    <CheckCircleFilled style={{ fontSize: '48px', color: '#25D366', marginBottom: '1.5rem' }} />
                                    <Title level={3} style={{ color: 'white' }}>Thank you!</Title>
                                    <Paragraph style={{ color: 'rgba(255,255,255,0.6)' }}>
                                        Your message has been sent successfully. I'll get back to you soon.
                                    </Paragraph>
                                    <Button type="primary" shape="round" onClick={() => setStatus('idle')}>
                                        Send Another
                                    </Button>
                                </div>
                            ) : (
                                <Form
                                    form={form}
                                    layout="vertical"
                                    onFinish={onFinish}
                                    className="antd-form-custom"
                                >
                                    <Row gutter={16}>
                                        <Col xs={24} sm={12}>
                                            <Form.Item
                                                name="firstName"
                                                rules={[{ required: true, message: 'Please enter your first name' }]}
                                            >
                                                <Input placeholder="First Name" size="large" />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={12}>
                                            <Form.Item
                                                name="lastName"
                                                rules={[{ required: true, message: 'Please enter your last name' }]}
                                            >
                                                <Input placeholder="Last Name" size="large" />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Form.Item
                                        name="email"
                                        rules={[
                                            { required: true, message: 'Please enter your email' },
                                            { type: 'email', message: 'Please enter a valid email' }
                                        ]}
                                    >
                                        <Input placeholder="Email Address" size="large" />
                                    </Form.Item>
                                    <Form.Item
                                        name="message"
                                        rules={[{ required: true, message: 'Please enter your message' }]}
                                    >
                                        <TextArea placeholder="Your Message" rows={4} size="large" />
                                    </Form.Item>

                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            icon={<SendOutlined />}
                                            loading={status === 'sending'}
                                            block
                                            size="large"
                                            shape="round"
                                            className="contact-submit-btn-antd"
                                        >
                                            {status === 'sending' ? 'Sending...' : 'Send Message'}
                                        </Button>
                                    </Form.Item>

                                    {status === 'error' && (
                                        <Text type="danger" style={{ display: 'block', textAlign: 'center' }}>
                                            <ExclamationCircleFilled /> Something went wrong. Please try again.
                                        </Text>
                                    )}
                                </Form>
                            )}
                        </motion.div>
                    </Col>
                </Row>
            </div>
        </section>
    );
};

export default Contact;
