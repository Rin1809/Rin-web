import React from 'react';
import styles from './Header.module.css';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
    const location = useLocation();
    const isHome = location.pathname === '/';
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const getLink = (hash: string) => {
        return isHome ? hash : `/${hash}`;
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.left}>
                    <Link to="/" className={styles.logo}>
                        <img src="/logo.svg" alt="Rin - Lyn" className={styles.logoIcon} />
                    </Link>
                    <span className={styles.brandName}>
                        <span className={styles.highlight}>Rin  -</span>  Lyn
                    </span>

                    {/* Menu cho may tinh */}
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
                        className={`${styles.downloadButton} ${styles.desktopOnly}`}
                    >
                        Donate
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}>
                            <path d="M5 12h14" />
                            <path d="M12 5l7 7-7 7" />
                        </svg>
                    </a>

                    {/* Nut hamburger, bam vao ra menu */}
                    <button className={styles.hamburger} onClick={toggleMenu} aria-label="Toggle menu">
                        {isMenuOpen ? (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        ) : (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="1"></circle>
                                <circle cx="12" cy="5" r="1"></circle>
                                <circle cx="12" cy="19" r="1"></circle>
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Menu mobile xo xuong, hoi lag ty thong cam */}
            {isMenuOpen && (
                <div className={styles.mobileMenu}>
                    <Link to="/project" className={styles.mobileNavLink} onClick={toggleMenu}>Project</Link>
                    <Link to="/blog" className={styles.mobileNavLink} onClick={toggleMenu}>Blog</Link>
                    <a href={getLink('#footer')} className={styles.mobileNavLink} onClick={toggleMenu}>Info</a>
                    <a
                        href="https://quybaotrotreemvietnam.org.vn"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.mobileNavLink}
                        onClick={toggleMenu}
                        style={{ color: '#eb5e28', fontWeight: 600 }}
                    >
                        Donate
                    </a>
                </div>
            )}
        </header>
    );
};

export default Header;
