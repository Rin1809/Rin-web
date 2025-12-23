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
                            <li>Email: rinn1913@gmail.com</li>
                            <li><a href="https://github.com/Rin1809">GitHub</a></li>
                        </ul>
                    </div>
                    <div className={styles.column}>
                        <h3>Social</h3>
                        <ul>
                            <li><a href="#">Discord</a></li>
                            <li><a href="https://discord.gg/E6QBrZtGgc">Discord Server</a></li>
                            <li><a href="https://www.youtube.com/@RinnRin1913">Youtube</a></li>
                            <li><a href="https://www.tiktok.com/@rinrinn1913">Tiktok</a></li>
                            <li><a href="https://open.spotify.com/user/31rc36tnihbyq66lcjkfbtm57frm?si=5d83dbdc9bb94045">Spotify</a></li>
                        </ul>
                    </div>
                    {/* Optional 3rd column if needed, or stick to image which had 2-3ish visual groups */}
                </div>
            </div>

            <div className={styles.brandTitle}>
                <div className={styles.wordGroup}>
                    <img src="/r3.png" alt="G" className={styles.brandImage} />
                    <span className={styles.textPart}>in -</span>
                </div>
                <div className={styles.wordGroup}>
                    <img src="/L3.png" alt="H" className={styles.brandImage} />
                    <span className={styles.specialChar}>y</span>
                    <span className={styles.specialChar}>n</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
