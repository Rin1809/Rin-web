import styles from './GithubStatsSection.module.css';

const GithubStatsSection = () => {
    const username = "Rin1809";

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.sectionTitle}>Github Stats</h2>

                <div className={styles.contentWrapper}>
                    {/* Left Column: Avatar Only */}
                    <div className={styles.profileColumn}>
                        <div className={styles.avatarWrapper}>
                            <img
                                src={`https://github.com/${username}.png`}
                                alt="Profile Avatar"
                                className={styles.avatar}
                            />
                        </div>
                    </div>

                    {/* Right Column: 2x2 Stats Grid */}
                    <div className={styles.statsColumn}>
                        <div className={styles.cardGrid}>
                            <img
                                src={`https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${username}&theme=transparent`}
                                alt="Profile Details"
                                className={`${styles.card} ${styles.fullWidthCard}`}
                            />
                            <img
                                src={`https://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=${username}&theme=transparent`}
                                alt="Most Commit Language"
                                className={styles.card}
                            />
                            <img
                                src={`https://github-readme-stats.vercel.app/api/top-langs?username=${username}&show_icons=true&locale=en&layout=compact&theme=tokyonight&hide_border=true&bg_color=00000000`}
                                alt="Top Langs"
                                className={styles.card}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GithubStatsSection;
