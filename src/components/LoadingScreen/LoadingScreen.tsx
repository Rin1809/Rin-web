import React, { useEffect, useState } from 'react';
import styles from './LoadingScreen.module.css';

const LoadingScreen: React.FC = () => {
    const [progress, setProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 90) {
                    clearInterval(interval);
                    return 90;
                }
                const increment = Math.random() * 15;
                return Math.min(prev + increment, 90);
            });
        }, 100);

        const handleLoad = () => {
            clearInterval(interval);
            setProgress(100);

            setTimeout(() => {
                setIsLoaded(true);
            }, 500);
        };

        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
        }

        return () => {
            window.removeEventListener('load', handleLoad);
            clearInterval(interval);
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
