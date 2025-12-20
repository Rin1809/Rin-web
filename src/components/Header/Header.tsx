import React from 'react';
import styles from './Header.module.css';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
    const location = useLocation();
    const isHome = location.pathname === '/';

    const getLink = (hash: string) => {
        return isHome ? hash : `/${hash}`;
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.left}>
                    <Link to="/" className={styles.logo}>
                        <img src="/Image_202512142023-removebg-preview.png" alt="Rin - Lyn" className={styles.logoIcon} />
                    </Link>
                    <span className={styles.brandName}>
                        <span className={styles.highlight}>Rin</span> - Lyn
                    </span>

                    <nav className={styles.nav}>
                        <Link to="/project" className={styles.navLink}>Project</Link>
                        <Link to="/blog" className={styles.navLink}>Blog</Link>
                        <a href={getLink('#footer')} className={styles.navLink}>Info</a>
                    </nav>
                </div>

                <div className={styles.right}>
                    <a
                        href="https://quybaotrotreemvietnam.org.vn"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.downloadButton}
                    >
                        Donate
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}>
                            <path d="M5 12h14" />
                            <path d="M12 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;
