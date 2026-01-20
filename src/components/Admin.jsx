import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Settings, Info, Code as CodeIcon, Laptop, Briefcase, User, Plus, Trash2, CheckCircle, ExternalLink, AlertCircle } from 'lucide-react';
import { portfolioConfig } from '../data/config';

const Admin = () => {
    const [config, setConfig] = useState(portfolioConfig);
    const [activeTab, setActiveTab] = useState('profile');
    const [showCode, setShowCode] = useState(false);
    const [notification, setNotification] = useState(null);

    const showNotify = (msg) => {
        setNotification(msg);
        setTimeout(() => setNotification(null), 3000);
    };

    // Generic Handlers
    const handleUpdate = (section, field, value) => {
        setConfig(prev => ({
            ...prev,
            [section]: section === 'profile' || section === 'about'
                ? { ...prev[section], [field]: value }
                : value
        }));
    };

    // List Management (Profile Roles, About Bio & Stats)
    const handleRoleChange = (index, value) => {
        const newRoles = [...config.profile.roles];
        newRoles[index] = value;
        handleUpdate('profile', 'roles', newRoles);
    };

    const addRole = () => {
        handleUpdate('profile', 'roles', [...config.profile.roles, ""]);
    };

    const removeRole = (index) => {
        handleUpdate('profile', 'roles', config.profile.roles.filter((_, i) => i !== index));
    };

    const handleBioChange = (index, value) => {
        const newBio = [...config.about.bio];
        newBio[index] = value;
        handleUpdate('about', 'bio', newBio);
    };

    const addBioPara = () => {
        handleUpdate('about', 'bio', [...config.about.bio, ""]);
    };

    const removeBioPara = (index) => {
        handleUpdate('about', 'bio', config.about.bio.filter((_, i) => i !== index));
    };

    const handleStatChange = (index, field, value) => {
        const newStats = [...config.about.stats];
        newStats[index][field] = value;
        handleUpdate('about', 'stats', newStats);
    };

    const addStat = () => {
        handleUpdate('about', 'stats', [...config.about.stats, { label: "New Stat", value: "Value" }]);
    };

    const removeStat = (index) => {
        handleUpdate('about', 'stats', config.about.stats.filter((_, i) => i !== index));
    };

    // Skills Management
    const updateCategory = (catIndex, field, value) => {
        const newCats = [...config.skillCategories];
        newCats[catIndex] = { ...newCats[catIndex], [field]: value };
        setConfig(prev => ({ ...prev, skillCategories: newCats }));
    };

    const addSkill = (catIndex) => {
        const newCats = [...config.skillCategories];
        newCats[catIndex].skills.push("");
        setConfig(prev => ({ ...prev, skillCategories: newCats }));
    };

    const removeSkill = (catIndex, skillIndex) => {
        const newCats = [...config.skillCategories];
        newCats[catIndex].skills = newCats[catIndex].skills.filter((_, i) => i !== skillIndex);
        setConfig(prev => ({ ...prev, skillCategories: newCats }));
    };

    const updateSkillText = (catIndex, skillIndex, value) => {
        const newCats = [...config.skillCategories];
        newCats[catIndex].skills[skillIndex] = value;
        setConfig(prev => ({ ...prev, skillCategories: newCats }));
    };

    // Project Management
    const updateProject = (projIndex, field, value) => {
        const newProjs = [...config.projects];
        if (field === 'tags') {
            value = value.split(',').map(t => t.trim());
        }
        newProjs[projIndex] = { ...newProjs[projIndex], [field]: value };
        setConfig(prev => ({ ...prev, projects: newProjs }));
    };

    const addProject = () => {
        const newProject = {
            title: "New Project",
            desc: "Description here...",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
            demo: "#",
            code: "#",
            tags: ["React", "CSS"]
        };
        setConfig(prev => ({ ...prev, projects: [...prev.projects, newProject] }));
    };

    const removeProject = (index) => {
        setConfig(prev => ({ ...prev, projects: prev.projects.filter((_, i) => i !== index) }));
    };

    const handleDownload = () => {
        const dataStr = "export const portfolioConfig = " + JSON.stringify(config, null, 2) + ";";
        const dataUri = 'data:application/javascript;charset=utf-8,' + encodeURIComponent(dataStr);
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', 'config.js');
        linkElement.click();
        showNotify("Config downloaded! Replace your src/data/config.js with this file.");
    };

    const tabs = [
        { id: 'profile', label: 'Profile', icon: <User size={18} /> },
        { id: 'about', label: 'About', icon: <Info size={18} /> },
        { id: 'skills', label: 'Skills', icon: <Laptop size={18} /> },
        { id: 'projects', label: 'Projects', icon: <Briefcase size={18} /> }
    ];

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'MadhuReddy') {
            setIsAuthenticated(true);
            showNotify("Welcome back, Madhu!");
        } else {
            showNotify("Incorrect password");
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="admin-dashboard container section-padding" style={{ minHeight: '100vh', paddingTop: '150px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <AnimatePresence>
                    {notification && (
                        <motion.div
                            initial={{ opacity: 0, y: 50, x: '-50%' }}
                            animate={{ opacity: 1, y: 0, x: '-50%' }}
                            exit={{ opacity: 0, y: 20, x: '-50%' }}
                            className="admin-notification"
                            style={{
                                position: 'fixed', bottom: '30px', left: '50%',
                                background: notification === 'Incorrect password' ? '#ff4d4d' : 'var(--accent-blue)', color: 'white',
                                padding: '1rem 2rem', borderRadius: '50px', zIndex: 2000,
                                display: 'flex', alignItems: 'center', gap: '0.8rem',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                            }}
                        >
                            <Info size={20} /> {notification}
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ background: 'var(--bg-card)', padding: '3rem', borderRadius: '24px', border: '1px solid var(--glass-border)', textAlign: 'center', maxWidth: '400px', width: '100%' }}
                >
                    <User size={48} color="var(--accent-blue)" style={{ marginBottom: '1.5rem' }} />
                    <h2 style={{ marginBottom: '1.5rem' }}>Admin Access</h2>
                    <form onSubmit={handleLogin}>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)',
                                border: '1px solid var(--glass-border)', borderRadius: '12px',
                                color: '#fff', marginBottom: '1.5rem', outline: 'none'
                            }}
                            autoFocus
                        />
                        <button type="submit" className="btn primary-btn" style={{ width: '100%', justifyContent: 'center' }}>
                            Login
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="admin-dashboard container section-padding" style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '100px' }}>
            {/* Notification */}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: 20, x: '-50%' }}
                        className="admin-notification"
                        style={{
                            position: 'fixed', bottom: '30px', left: '50%',
                            background: 'var(--accent-blue)', color: 'white',
                            padding: '1rem 2rem', borderRadius: '50px', zIndex: 2000,
                            display: 'flex', alignItems: 'center', gap: '0.8rem',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                        }}
                    >
                        <CheckCircle size={20} /> {notification}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="admin-header"
                style={{ marginBottom: '3rem', textAlign: 'center' }}
            >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <Settings className="settings-icon-spin" size={32} color="var(--accent-blue)" />
                    <h1 className="section-title" style={{ marginBottom: 0 }}>Admin Control Hub</h1>
                </div>
                <p style={{ color: 'var(--text-secondary)' }}>Manage your personal details and portfolio content directly.</p>
            </motion.div>

            <div className="admin-layout" style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 250px) 1fr', gap: '2rem' }}>
                {/* Sidebar */}
                <aside className="admin-sidebar" style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '20px', height: 'fit-content', border: '1px solid var(--glass-border)' }}>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => { setActiveTab(tab.id); setShowCode(false); }}
                            style={{
                                width: '100%', padding: '0.8rem 1.2rem', display: 'flex', alignItems: 'center', gap: '0.8rem',
                                background: activeTab === tab.id && !showCode ? 'var(--accent-blue)' : 'transparent',
                                color: activeTab === tab.id && !showCode ? 'white' : 'var(--text-secondary)',
                                border: 'none', borderRadius: '12px', marginBottom: '0.5rem', cursor: 'pointer', transition: 'var(--transition)'
                            }}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                    <hr style={{ border: 'none', height: '1px', background: 'var(--glass-border)', margin: '1.5rem 0' }} />
                    <button
                        onClick={() => setShowCode(!showCode)}
                        style={{
                            width: '100%', padding: '0.8rem 1.2rem', display: 'flex', alignItems: 'center', gap: '0.8rem',
                            background: showCode ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.05)',
                            color: showCode ? 'var(--bg-dark)' : 'var(--text-secondary)',
                            border: '1px solid var(--glass-border)', borderRadius: '12px', cursor: 'pointer', fontWeight: showCode ? 'bold' : 'normal'
                        }}
                    >
                        <CodeIcon size={18} /> {showCode ? 'Editor View' : 'JSON View'}
                    </button>

                    <button onClick={handleDownload} className="btn primary-btn" style={{ marginTop: '1.5rem', width: '100%', padding: '0.8rem' }}>
                        <Save size={18} style={{ marginRight: '8px' }} /> Save Changes
                    </button>
                </aside>

                {/* Content */}
                <main className="admin-content" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--glass-border)', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
                    {showCode ? (
                        <div className="code-view">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <h3>Configuration JSON</h3>
                                <div style={{ display: 'flex', gap: '0.5rem', color: 'var(--accent-cyan)', fontSize: '0.9rem' }}>
                                    <AlertCircle size={16} /> Read-only preview
                                </div>
                            </div>
                            <pre style={{ background: '#000', padding: '1.5rem', borderRadius: '12px', overflowX: 'auto', fontSize: '0.85rem', color: '#00f5d4', border: '1px solid var(--glass-border)', maxHeight: '600px' }}>
                                {`export const portfolioConfig = ${JSON.stringify(config, null, 2)};`}
                            </pre>
                        </div>
                    ) : (
                        <div className="form-view">
                            {/* Profile Tab */}
                            {activeTab === 'profile' && (
                                <div className="admin-form">
                                    <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>Basic Profile</h3>
                                    <div className="admin-field-group" style={{ display: 'grid', gap: '1.5rem' }}>
                                        <div>
                                            <label className="admin-label">Full Name</label>
                                            <input className="admin-input" type="text" value={config.profile.name} onChange={(e) => handleUpdate('profile', 'name', e.target.value)} />
                                        </div>

                                        {/* Profile Image Section */}
                                        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                                            <label className="admin-label">Profile Picture</label>
                                            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '1.5rem', alignItems: 'center' }}>
                                                <div style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--accent-blue)', boxShadow: '0 10px 30px rgba(58, 134, 255, 0.3)' }}>
                                                    <img
                                                        src={config.profile.profileImage || 'https://via.placeholder.com/120'}
                                                        alt="Profile Preview"
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/120?text=No+Image'; }}
                                                    />
                                                </div>
                                                <div>
                                                    <input
                                                        className="admin-input"
                                                        type="text"
                                                        placeholder="Image URL or Base64"
                                                        value={config.profile.profileImage || ''}
                                                        onChange={(e) => handleUpdate('profile', 'profileImage', e.target.value)}
                                                        style={{ marginBottom: '0.8rem' }}
                                                    />
                                                    <div style={{ position: 'relative', overflow: 'hidden', display: 'inline-block' }}>
                                                        <button className="btn primary-btn" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                                                            <Plus size={16} style={{ marginRight: '5px' }} /> Upload Image
                                                        </button>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) => {
                                                                const file = e.target.files[0];
                                                                if (file) {
                                                                    const reader = new FileReader();
                                                                    reader.onloadend = () => {
                                                                        handleUpdate('profile', 'profileImage', reader.result);
                                                                        showNotify("Image uploaded successfully!");
                                                                    };
                                                                    reader.readAsDataURL(file);
                                                                }
                                                            }}
                                                            style={{ position: 'absolute', left: 0, top: 0, opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }}
                                                        />
                                                    </div>
                                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                                                        Supports JPG, PNG, GIF. (Max 2MB recommended)
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Resume Section */}
                                        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                                            <label className="admin-label">Resume / CV</label>
                                            <input
                                                className="admin-input"
                                                type="text"
                                                placeholder="Resume URL or Upload PDF"
                                                value={config.profile.resumeUrl || ''}
                                                onChange={(e) => handleUpdate('profile', 'resumeUrl', e.target.value)}
                                                style={{ marginBottom: '0.8rem' }}
                                            />
                                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                                                <div style={{ position: 'relative', overflow: 'hidden', display: 'inline-block' }}>
                                                    <button className="btn secondary-btn" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                                                        <Briefcase size={16} style={{ marginRight: '5px' }} /> Upload PDF
                                                    </button>
                                                    <input
                                                        type="file"
                                                        accept=".pdf"
                                                        onChange={(e) => {
                                                            const file = e.target.files[0];
                                                            if (file) {
                                                                if (file.size > 5000000) { // 5MB limit check
                                                                    alert("File is too large! Please use a file smaller than 5MB.");
                                                                    return;
                                                                }
                                                                const reader = new FileReader();
                                                                reader.onloadend = () => {
                                                                    handleUpdate('profile', 'resumeUrl', reader.result);
                                                                    showNotify("Resume uploaded successfully!");
                                                                };
                                                                reader.readAsDataURL(file);
                                                            }
                                                        }}
                                                        style={{ position: 'absolute', left: 0, top: 0, opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }}
                                                    />
                                                </div>
                                                {config.profile.resumeUrl && config.profile.resumeUrl !== '#' && (
                                                    <a
                                                        href={config.profile.resumeUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-blue)', fontSize: '0.85rem', textDecoration: 'none' }}
                                                    >
                                                        <ExternalLink size={14} /> Preview Resume
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="admin-label">Tagline</label>
                                            <textarea className="admin-input" rows="3" value={config.profile.tagline} onChange={(e) => handleUpdate('profile', 'tagline', e.target.value)} />
                                        </div>
                                        <div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                                <label className="admin-label" style={{ marginBottom: 0 }}>Auto-Typed Roles (Hero Text)</label>
                                                <button onClick={addRole} className="admin-action-btn" style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}><Plus size={12} /> Add Role</button>
                                            </div>
                                            {config.profile.roles.map((role, i) => (
                                                <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                                    <input className="admin-input" style={{ padding: '0.5rem' }} value={role} onChange={(e) => handleRoleChange(i, e.target.value)} />
                                                    <button onClick={() => removeRole(i)} className="admin-delete-btn" style={{ width: '35px', height: '35px' }}><Trash2 size={14} /></button>
                                                </div>
                                            ))}
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                            <div>
                                                <label className="admin-label">Contact Email</label>
                                                <input className="admin-input" type="email" value={config.profile.email} onChange={(e) => handleUpdate('profile', 'email', e.target.value)} />
                                            </div>
                                            <div>
                                                <label className="admin-label">WhatsApp Number</label>
                                                <input className="admin-input" type="text" value={config.profile.whatsapp} onChange={(e) => handleUpdate('profile', 'whatsapp', e.target.value)} />
                                            </div>
                                            <div>
                                                <label className="admin-label">GitHub URL</label>
                                                <input className="admin-input" type="text" value={config.profile.github} onChange={(e) => handleUpdate('profile', 'github', e.target.value)} />
                                            </div>
                                            <div>
                                                <label className="admin-label">LinkedIn URL</label>
                                                <input className="admin-input" type="text" value={config.profile.linkedin} onChange={(e) => handleUpdate('profile', 'linkedin', e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* About Tab */}
                            {activeTab === 'about' && (
                                <div className="admin-form">
                                    <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>About & Bio</h3>

                                    <div style={{ marginBottom: '2.5rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                            <label className="admin-label" style={{ marginBottom: 0 }}>Bio Paragraphs</label>
                                            <button onClick={addBioPara} className="admin-action-btn"><Plus size={14} /> Add Paragraph</button>
                                        </div>
                                        {config.about.bio.map((para, i) => (
                                            <div key={i} style={{ display: 'flex', gap: '0.8rem', marginBottom: '0.8rem' }}>
                                                <textarea className="admin-input" rows="2" value={para} onChange={(e) => handleBioChange(i, e.target.value)} />
                                                <button onClick={() => removeBioPara(i)} className="admin-delete-btn"><Trash2 size={16} /></button>
                                            </div>
                                        ))}
                                    </div>

                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                            <label className="admin-label" style={{ marginBottom: 0 }}>Stats (Major, Focus, etc.)</label>
                                            <button onClick={addStat} className="admin-action-btn"><Plus size={14} /> Add Stat</button>
                                        </div>
                                        {config.about.stats.map((stat, i) => (
                                            <div key={i} style={{ display: 'grid', gridTemplateColumns: '150px 1fr 50px', gap: '0.8rem', marginBottom: '0.8rem' }}>
                                                <input className="admin-input" value={stat.label} onChange={(e) => handleStatChange(i, 'label', e.target.value)} placeholder="Label" />
                                                <input className="admin-input" value={stat.value} onChange={(e) => handleStatChange(i, 'value', e.target.value)} placeholder="Value" />
                                                <button onClick={() => removeStat(i)} className="admin-delete-btn"><Trash2 size={16} /></button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Skills Tab */}
                            {activeTab === 'skills' && (
                                <div className="admin-form">
                                    <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>Skills Architecture</h3>
                                    {config.skillCategories.map((cat, catIdx) => (
                                        <div key={catIdx} className="admin-card-inner" style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '15px', marginBottom: '1.5rem', border: '1px solid var(--glass-border)' }}>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 150px', gap: '1rem', marginBottom: '1rem' }}>
                                                <input className="admin-input" style={{ fontWeight: 'bold' }} value={cat.title} onChange={(e) => updateCategory(catIdx, 'title', e.target.value)} />
                                                <input className="admin-input" type="color" value={cat.color.startsWith('var') ? '#3a86ff' : cat.color} onChange={(e) => updateCategory(catIdx, 'color', e.target.value)} />
                                            </div>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                                {cat.skills.map((skill, sIdx) => (
                                                    <div key={sIdx} style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '2px 8px' }}>
                                                        <input
                                                            className="admin-input-small"
                                                            style={{ width: '80px', background: 'transparent', border: 'none', color: '#fff' }}
                                                            value={skill}
                                                            onChange={(e) => updateSkillText(catIdx, sIdx, e.target.value)}
                                                        />
                                                        <button onClick={() => removeSkill(catIdx, sIdx)} style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', display: 'flex' }}><Trash2 size={12} /></button>
                                                    </div>
                                                ))}
                                                <button onClick={() => addSkill(catIdx)} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '8px', padding: '0.4rem 0.8rem', fontSize: '0.8rem', cursor: 'pointer' }}>+ Add</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Projects Tab */}
                            {activeTab === 'projects' && (
                                <div className="admin-form">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
                                        <h3>Manage Projects</h3>
                                        <button onClick={addProject} className="admin-action-btn"><Plus size={14} /> New Project</button>
                                    </div>
                                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                                        {config.projects.map((proj, i) => (
                                            <div key={i} className="admin-card-inner" style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '15px', border: '1px solid var(--glass-border)' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                                    <input className="admin-input" style={{ fontWeight: 'bold', fontSize: '1.1rem' }} value={proj.title} onChange={(e) => updateProject(i, 'title', e.target.value)} />
                                                    <button onClick={() => removeProject(i)} className="admin-delete-btn" style={{ height: '40px' }}><Trash2 size={18} /></button>
                                                </div>
                                                <textarea className="admin-input" rows="2" style={{ marginBottom: '1rem' }} value={proj.desc} onChange={(e) => updateProject(i, 'desc', e.target.value)} />
                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                                    <input className="admin-input" placeholder="Image URL" value={proj.image} onChange={(e) => updateProject(i, 'image', e.target.value)} />
                                                    <input className="admin-input" placeholder="Tags (comma separated)" value={proj.tags.join(', ')} onChange={(e) => updateProject(i, 'tags', e.target.value)} />
                                                </div>
                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                                    <input className="admin-input" placeholder="Demo URL" value={proj.demo} onChange={(e) => updateProject(i, 'demo', e.target.value)} />
                                                    <input className="admin-input" placeholder="Code URL" value={proj.code} onChange={(e) => updateProject(i, 'code', e.target.value)} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </main>
            </div >

            <style>{`
                .admin-label { display: block; margin-bottom: 0.5rem; color: var(--accent-cyan); font-weight: 500; font-size: 0.9rem; }
                .admin-input { width: 100%; padding: 0.8rem; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); border-radius: 10px; color: #fff; font-family: inherit; transition: var(--transition); outline: none; }
                .admin-input:focus { border-color: var(--accent-blue); background: rgba(255,255,255,0.08); }
                .admin-action-btn { background: rgba(58, 134, 255, 0.1); color: var(--accent-blue); border: 1px solid var(--accent-blue); padding: 0.4rem 0.8rem; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; font-weight: 600; }
                .admin-delete-btn { background: rgba(255, 77, 77, 0.1); color: #ff4d4d; border: 1px solid rgba(255, 77, 77, 0.2); width: 45px; display: flex; align-items: center; justify-content: center; border-radius: 8px; cursor: pointer; transition: all 0.2s; }
                .admin-delete-btn:hover { background: rgba(255, 77, 77, 0.2); }
                .settings-icon-spin:hover { animation: spin 2s linear infinite; }
                @keyframes spin { from {transform: rotate(0deg);} to {transform: rotate(360deg);} }
            `}</style>
        </div >
    );
};

export default Admin;
