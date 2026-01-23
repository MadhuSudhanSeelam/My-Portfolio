import { useState, useEffect } from 'react';
import { Menu, Drawer, Button } from 'antd';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuItems = [
        { key: 'hero', label: <a href="#hero">Home</a> },
        { key: 'about', label: <a href="#about">About</a> },
        { key: 'skills', label: <a href="#skills">Skills</a> },
        { key: 'projects', label: <a href="#projects">Projects</a> },
        { key: 'contact', label: <a href="#contact">Contact</a> },
    ];

    return (
        <header className={`navbar-antd ${isScrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <a href="#" className="logo">PORTFOL<span>IO</span></a>

                {/* Desktop Menu */}
                <div className="desktop-menu">
                    <Menu
                        mode="horizontal"
                        items={menuItems}
                        selectable={false}
                        className="antd-navbar-menu"
                    />
                </div>

                {/* Mobile Menu Toggle */}
                <div className="mobile-menu-btn">
                    <Button
                        type="text"
                        icon={isOpen ? <CloseOutlined /> : <MenuOutlined />}
                        onClick={() => setIsOpen(!isOpen)}
                        size="large"
                        style={{ color: 'white' }}
                    />
                </div>

                {/* Mobile Drawer */}
                <Drawer
                    title="Navigation"
                    placement="right"
                    onClose={() => setIsOpen(false)}
                    open={isOpen}
                    width={280}
                    className="mobile-drawer-antd"
                    styles={{ body: { padding: 0 } }}
                >
                    <Menu
                        mode="inline"
                        items={menuItems.map(item => ({
                            ...item,
                            onClick: () => setIsOpen(false)
                        }))}
                        selectable={false}
                    />
                </Drawer>
            </div>
        </header>
    );
};

export default Navbar;
