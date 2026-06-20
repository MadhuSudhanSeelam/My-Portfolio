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
        github: GITHUB_URL,
        linkedin: LINKEDIN_URL,
        leetcode: LEETCODE_URL,
        hackerRank: HACKERRANK_URL,
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
        { icon: <MailOutlined />, href: `mailto:${EMAIL_ADDRESS}`, label: "Email", color: "#743333ff" },
        {
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '1em', height: '1em' }}>
                    <path d="M13.483 0a1.374 1.374 0 0 0-.961.414l-9.88 9.88a1.374 1.374 0 0 0 0 1.94l6.058 6.057a1.374 1.374 0 0 0 1.94 0l1.517-1.517a.677.677 0 0 1 .957 0 .678.678 0 0 1 0 .958l-1.517 1.518a1.374 1.374 0 0 0 0 1.94l1.455 1.455a1.374 1.374 0 0 0 1.94 0l9.88-9.88a1.374 1.374 0 0 0 0-1.94L14.444.414A1.374 1.374 0 0 0 13.483 0zm.014 2.117 7.425 7.425-9.88 9.88-1.01-1.01a.341.341 0 0 1 0-.484.341.341 0 0 1 .484 0l1.01 1.01 1.517-1.518a.341.341 0 0 0 0-.484.341.341 0 0 0-.484 0l-1.517 1.518-6.058-6.058 9.88-9.88zM4.336 10.29c-.31.002-.621.12-.857.356l-3.08 3.08a1.212 1.212 0 0 0 0 1.715l3.08 3.08a1.212 1.212 0 0 0 1.715 0l3.08-3.08a1.212 1.212 0 0 0 0-1.715l-3.08-3.08a1.212 1.212 0 0 0-.858-.356zm0 1.326c.11 0 .221.042.305.126l3.08 3.08a.431.431 0 0 1 0 .61l-3.08 3.08a.431.431 0 0 1-.61 0l-3.08-3.08a.431.431 0 0 1 0-.61l3.08-3.08a.431.431 0 0 1 .305-.126z" />
                </svg>
            ),
            href: LEETCODE_URL,
            label: "LeetCode",
            color: "#FFA116"
        },
        {
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '1em', height: '1em' }}>
                    <path d="M12 0L1.6 6v12L12 24l10.4-6V6L12 0zM3.9 16.5V7.5L12 2.8l8.1 4.7v9L12 21.2l-8.1-4.7zM15 12l-3-1.7-3 1.7V15l3 1.7 3-1.7V12z" />
                </svg>
            ),
            href: HACKERRANK_URL,
            label: "HackerRank",
            color: "#2EC866"
        },
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
