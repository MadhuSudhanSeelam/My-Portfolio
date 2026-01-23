import { Typography, Divider } from 'antd';
import { portfolioConfig } from '../data/config';
import './Footer.css';

const { Text } = Typography;

const Footer = () => {
    const { name } = portfolioConfig.profile;
    const year = new Date().getFullYear();

    return (
        <footer className="footer-antd">
            <div className="container">
                <Divider className="footer-divider-antd" />
                <div className="footer-content-antd">
                    <Text className="copyright-text-antd">
                        &copy; {year} {name}. All rights reserved.
                    </Text>
                    <Text className="built-with-text-antd">
                        Built with React, Ant Design & Framer Motion
                    </Text>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
