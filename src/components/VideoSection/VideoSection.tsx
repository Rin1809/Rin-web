import React from 'react';
import styles from './VideoSection.module.css';

const VideoSection: React.FC = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>

                    <h2 className={styles.title}>|【りょ子】小夜子/Evening Child -acoustic ver.- を歌ってみた</h2>
                </div>
                <div className={styles.videoWrapper}>
                    <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/fuanpbPZFlk"
                        title="Google Antigravity"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </section>
    );
};

export default VideoSection;
