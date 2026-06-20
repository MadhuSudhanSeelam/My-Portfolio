import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { ConfigProvider, theme } from 'antd';
import { portfolioConfig } from './data/config';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Admin from './components/Admin';

function App() {
    const { name, tagline } = portfolioConfig.profile;

    return (
        <HelmetProvider>
            <ConfigProvider
                theme={{
                    algorithm: theme.darkAlgorithm,
                    token: {
                        colorPrimary: '#3a86ff',
                        borderRadius: 8,
                        fontFamily: "'Inter', sans-serif",
                    },
                }}
            >
                <Router>
                    <Helmet>
                        <title>{name} | Portfolio</title>
                        <meta name="description" content={tagline} />
                        <meta name="keywords" content="Portfolio, Web Developer, React, Frontend, Backend, Full Stack" />
                    </Helmet>
                    <div className="app">
                        <Routes>
                            {/* Main Portfolio Layout */}
                            <Route path="/" element={
                                <>
                                    <Navbar />
                                    <main>
                                        <Hero />
                                        <About />
                                        <Skills />
                                        <Experience />
                                        <Projects />
                                        <Achievements />
                                        <Certifications />
                                        <Contact />
                                    </main>
                                    <Footer />
                                </>
                            } />

                            {/* Admin Dashboard */}
                            <Route path="/admin" element={
                                <>
                                    <Helmet>
                                        <title>Admin Dashboard | {name}</title>
                                        <meta name="robots" content="noindex" />
                                    </Helmet>
                                    <Admin />
                                </>
                            } />
                        </Routes>
                    </div>
                </Router>
            </ConfigProvider>
        </HelmetProvider>
    );
}

export default App;
