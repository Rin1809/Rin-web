import React from 'react';
import styles from './IntroVideo.module.css';

const IntroVideo: React.FC = () => {
    return (
        <section className={styles.videoContainer}>
            <video
                className={styles.video}
                autoPlay
                loop
                muted
                playsInline
            >
                <source src="/yu.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <img src="/hj.png" alt="Overlay" className={styles.overlayImage} />
            {/* Optional scroll indicator if user wants it later */}
            {/* <div className={styles.overlay}>Scroll Down</div> */}
        </section>
    );
};

export default IntroVideo;
