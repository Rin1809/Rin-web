import React, { useRef } from 'react';
import { useScroll, useTransform, motion, MotionValue } from 'framer-motion';
import styles from './GalleryScroll.module.css';

const images = [
    '/v1.jpg',
    '/v2.jpg',
    '/v6.webp',
    '/v5.webp',
    '/v3.jpg',
    '/v4.webp',
    '/v7.webp',
    '/v8.gif'
];

interface CardProps {
    index: number;
    url: string;
    progress: MotionValue<number>;
    range: [number, number];
    targetScale: number;
}

const Card: React.FC<CardProps> = ({ index, url, progress, range, targetScale }) => {
    const scale = useTransform(progress, range, [1, targetScale]);



    return (
        <div className={styles.cardContainer}>
            <motion.div
                style={{
                    scale,
                    top: `calc(-10% + ${index * 25}px)`
                }}
                className={styles.card}
            >
                <div className={styles.imageWrapper}>
                    <img src={url} alt={`gallery-${index}`} className={styles.image} />
                </div>
            </motion.div>
        </div>
    );
};

const GalleryScroll: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    });

    return (
        <div ref={containerRef} className={styles.main}>
            {images.map((url, i) => {
                const targetScale = 1 - ((images.length - i) * 0.05);
                return (
                    <Card
                        key={i}
                        index={i}
                        url={url}
                        progress={scrollYProgress}
                        range={[i * 0.25, 1]}
                        targetScale={targetScale}
                    />
                );
            })}
        </div>
    );
};

export default GalleryScroll;
