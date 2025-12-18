import React, { useEffect, useState } from 'react';
import styles from './ProjectPage.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { projects } from '../../data/projects';

const ProjectPage: React.FC = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [videoInteracting, setVideoInteracting] = useState(false);

    return (
        <div className={styles.page}>
            <Header />
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.pageTitle}>Projects</h1>
                </header>

                <article className={styles.featuredArticle}>
                    <div className={styles.videoHeader}>
                        <h2 className={styles.videoTitle}>| Featured Project Demo</h2>
                    </div>

                    <div
                        className={styles.videoWrapper}
                        onMouseLeave={() => setVideoInteracting(false)}
                        onClick={() => setVideoInteracting(true)}
                    >
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube-nocookie.com/embed/TLvMXOEXi_k"
                            title="Project Demo"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{ pointerEvents: videoInteracting ? 'auto' : 'none' }}
                        ></iframe>
                    </div>
                </article>

                {/* Latest Projects Section Header (with Tabs) */}
                <div className={styles.projectsSection}>
                    <h2 className={styles.sectionTitle}>Latest Projects</h2>
                    <div className={styles.tabs}>
                        <span className={`${styles.tab} ${styles.activeTab}`}>All</span>
                        <span className={styles.tab}>Product</span>
                    </div>
                </div>

                {/* Project List */}
                <div className={styles.projectList}>
                    {projects.map((project) => (
                        <div key={project.id} className={styles.projectItem}>
                            <div className={styles.projectImageWrapper}>
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className={styles.projectImage}
                                />
                            </div>
                            <div className={styles.projectContent}>
                                <div className={styles.projectHeader}>
                                    <h2 className={styles.projectTitle}>{project.title}</h2>
                                    <div className={styles.actionButtons}>
                                        {/* Download Zip */}
                                        <a href={project.downloadUrl} className={styles.iconLink} title="Download Zip" download>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                <polyline points="7 10 12 15 17 10" />
                                                <line x1="12" y1="15" x2="12" y2="3" />
                                            </svg>
                                        </a>
                                        {/* GitHub */}
                                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.iconLink} title="View on GitHub">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                                            </svg>
                                        </a>
                                        {/* Docs */}
                                        {project.docsUrl && (
                                            <a href={project.docsUrl} target="_blank" rel="noopener noreferrer" className={styles.iconLink} title="Documentation">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                    <polyline points="14 2 14 8 20 8" />
                                                    <line x1="16" y1="13" x2="8" y2="13" />
                                                    <line x1="16" y1="17" x2="8" y2="17" />
                                                    <polyline points="10 9 9 9 8 9" />
                                                </svg>
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <p className={styles.projectDescription}>{project.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProjectPage;
