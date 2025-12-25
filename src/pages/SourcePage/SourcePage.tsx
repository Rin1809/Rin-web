import React, { useState, useMemo, useEffect } from 'react';
import styles from './SourcePage.module.css';
import { sourceData, type SourceItem } from '../../data/source';
import { Folder, FileText, ChevronRight, HardDrive } from 'lucide-react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import WhatIsThis from '../../components/WhatIsThis/WhatIsThis';
import SourceHero from '../../components/SourceHero/SourceHero';

const SourcePage: React.FC = () => {
    // Scroll top when entering (for polite UX)
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);

    // Filter items based on current folder
    const currentItems = useMemo(() => {
        return sourceData.filter(item => item.parentId === currentFolderId);
    }, [currentFolderId]);

    // Handle navigation
    const handleItemClick = (item: SourceItem) => {
        if (item.type === 'folder') {
            setCurrentFolderId(item.id);
        } else if (item.link) {
            window.open(item.link, '_blank');
        }
    };

    // Breadcrumb logic
    const breadcrumbs = useMemo(() => {
        const crumbs = [];
        let tempId = currentFolderId;

        while (tempId) {
            const folder = sourceData.find(i => i.id === tempId);
            if (folder) {
                crumbs.unshift(folder);
                tempId = folder.parentId;
            } else {
                break;
            }
        }
        return crumbs;
    }, [currentFolderId]);

    return (
        <div className={styles.page}>
            <Header />

            <SourceHero />

            <WhatIsThis
                highlight="Digital Archive & Tools"
                description="A centralized cloud for my essential software installers, and development assets. Sorted and ready for deployment."
                defaultImage="/c11.png"
                hoverImage="/c12.png"
            />

            <div id="source-section" className={`${styles.container} ${styles.mainContainer}`}>
                {/* Source Header Section */}
                <div className={styles.projectsSection}>
                    <h2 className={styles.sectionTitle}>Source</h2>
                    <div className={styles.tabs}>
                        <span className={`${styles.tab} ${styles.activeTab}`}>All</span>
                    </div>
                </div>

                {/* Toolbar / Breadcrumbs */}
                <div className={styles.toolbar}>
                    <div
                        className={`${styles.crumb} ${!currentFolderId ? styles.crumbActive : ''}`}
                        onClick={() => setCurrentFolderId(null)}
                    >
                        <HardDrive size={18} />
                        <span>My Cloud</span>
                    </div>

                    {breadcrumbs.map((crumb) => (
                        <div key={crumb.id} className={styles.breadcrumb}>
                            <ChevronRight size={16} />
                            <div
                                className={`${styles.crumb} ${crumb.id === currentFolderId ? styles.crumbActive : ''}`}
                                onClick={() => setCurrentFolderId(crumb.id)}
                            >
                                <span>{crumb.name}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Grid Content */}
                <div className={styles.content}>
                    {currentItems.length === 0 ? (
                        <div className={styles.emptyState}>
                            <p>This folder is empty.</p>
                        </div>
                    ) : (
                        <div className={styles.grid}>
                            {currentItems.map((item) => (
                                <div
                                    key={item.id}
                                    className={styles.item}
                                    onClick={() => handleItemClick(item)}
                                >
                                    {item.type === 'folder' ? (
                                        <Folder className={styles.folderIcon} fill="currentColor" />
                                    ) : (
                                        <FileText className={styles.fileIcon} />
                                    )}

                                    <span className={styles.itemName}>{item.name}</span>

                                    <span className={styles.itemMeta}>
                                        {item.size} • {item.updatedAt}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default SourcePage;
