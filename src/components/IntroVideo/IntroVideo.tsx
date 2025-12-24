import React from 'react';
import styles from './IntroVideo.module.css';

const IntroVideo = React.forwardRef<HTMLElement>((props, ref) => {
    const contentRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleScroll = () => {
            if (!contentRef.current) return;
            const scrolled = window.scrollY;
            if (scrolled > window.innerHeight) return;

            contentRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section ref={ref} className={styles.videoContainer}>
            <div ref={contentRef} className={styles.parallaxContent}>
                <video
                    className={styles.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src="/ioo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <img src="/hj.webp" alt="Overlay" className={styles.overlayImage} />
        </section>
    );
});

export default IntroVideo;
