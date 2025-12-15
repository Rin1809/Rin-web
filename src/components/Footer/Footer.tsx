import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer id="footer" className={styles.footer}>
            <div className={styles.topSection}>
                <div className={styles.cta}>
                    Hi, I'm Rin
                </div>

                <div className={styles.links}>
                    <div className={styles.column}>
                        <h3>Contact</h3>
                        <ul>
                            <li><a href="#">Email</a></li>
                            <li><a href="#">LinkedIn</a></li>
                            <li><a href="https://github.com/Rin1809">GitHub</a></li>
                        </ul>
                    </div>
                    <div className={styles.column}>
                        <h3>Social</h3>
                        <ul>
                            <li><a href="#">Discord</a></li>
                            <li><a href="#">Discord Server</a></li>
                            <li><a href="#">Youtube</a></li>
                            <li><a href="#">Tiktok</a></li>
                            <li><a href="#">Spotify</a></li>
                        </ul>
                    </div>
                    {/* Optional 3rd column if needed, or stick to image which had 2-3ish visual groups */}
                </div>
            </div>

            <div className={styles.brandTitle}>
                <img src="/r3.png" alt="R" className={styles.brandImage} />
                in-
                <img src="/L3.png" alt="L" className={styles.brandImageL} />
                <span className={styles.specialChar}>y</span>
                <span className={styles.specialChar}>n</span>
            </div>
        </footer>
    );
};

export default Footer;
