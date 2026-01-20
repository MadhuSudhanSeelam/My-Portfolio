import { portfolioConfig } from '../data/config';

const Footer = () => {
    const { name } = portfolioConfig.profile;
    const year = new Date().getFullYear();

    return (
        <footer>
            <div className="container">
                <p>&copy; {year} {name}. All rights reserved.</p>
                <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', opacity: 0.6 }}>
                    Built with React & Framer Motion
                </p>
            </div>
        </footer>
    );
};

export default Footer;
