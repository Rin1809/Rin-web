import React, { useEffect, useState } from 'react';
import styles from './LoadingScreen.module.css';

const LoadingScreen: React.FC = () => {
    const [progress, setProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                const max = 85;
                if (prev >= max) {
                    return max;
                }
                const increment = Math.random() * 5;
                return Math.min(prev + increment, max);
            });
        }, 100);

        let windowLoaded = false;
        let videoReady = false;

        const tryFinishLoading = () => {
            // Only finish if both conditions are met
            // Note: If you have no video on other pages, you might need a timeout fallback!
            // For now, assuming IntroVideo is always present on Home.
            if (windowLoaded && videoReady) {
                clearInterval(interval);
                setProgress(100);
                setTimeout(() => setIsLoaded(true), 500);
            }
        };

        const handleLoad = () => {
            windowLoaded = true;
            tryFinishLoading();
        };

        const handleVideoReady = () => {
            videoReady = true;
            tryFinishLoading();
        };

        // Fallback: If video takes too long (> 5s), just force open
        const fallbackTimeout = setTimeout(() => {
            console.warn("Video load timeout, forcing open.");
            videoReady = true;
            windowLoaded = true;
            tryFinishLoading();
        }, 5000);

        if (document.readyState === 'complete') {
            windowLoaded = true;
        } else {
            window.addEventListener('load', handleLoad);
        }

        window.addEventListener('video-ready', handleVideoReady);

        return () => {
            window.removeEventListener('load', handleLoad);
            window.removeEventListener('video-ready', handleVideoReady);
            clearInterval(interval);
            clearTimeout(fallbackTimeout);
        };
    }, []);

    return (
        <div className={`${styles.container} ${isLoaded ? styles.hidden : ''}`}>
            <div className={styles.content}>
                <div className={styles.text}>ちょっと待っててね...</div>
                <div className={styles.progressBarContainer}>
                    <div
                        className={styles.progressBar}
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className={styles.percentage}>{Math.round(progress)}%</div>
            </div>
        </div>
    );
};

export default LoadingScreen;
