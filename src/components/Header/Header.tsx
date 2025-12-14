import React from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.left}>
                    <a href="/" className={styles.logo}>
                        <img src="/Image_202512142023-removebg-preview.png" alt="Rin - Lyn" className={styles.logoIcon} />
                    </a>
                    <span className={styles.brandName}>
                        <span className={styles.highlight}>Rin</span> - Lyn
                    </span>

                    <nav className={styles.nav}>
                        <a href="#" className={styles.navLink}>Project</a>
                        <a href="#" className={styles.navLink}>Blog</a>
                        <a href="#" className={styles.navLink}>Info</a>
                    </nav>
                </div>

                <div className={styles.right}>
                    <button className={styles.downloadButton}>
                        Click me
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}>
                            <path d="M5 12h14" />
                            <path d="M12 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
