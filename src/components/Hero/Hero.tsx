import React from 'react';
import styles from './Hero.module.css';

const Hero: React.FC = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <div className={styles.leftColumn}>
                    <div className={styles.logoWrapper}>
                        <img src="/Image_202512142023-removebg-preview.png" alt="Logo" style={{ height: '32px', width: 'auto' }} />
                        <span className={styles.brandName}><span className={styles.highlight}>Rin</span> - Lyn</span>
                    </div>

                    <h1 className={styles.title}>
                        ᓚᘏᗢ<br />
                        <span className={styles.titleSub}>Rin or the Lynn</span>
                    </h1>

                    <div className={styles.actions}>
                        <button className={styles.primaryButton}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }} xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 12H21" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                <path d="M3 6H21" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                <path d="M3 18H21" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M3 5H10.5V11.5H3V5ZM3 12.5H10.5V19H3V12.5ZM11.5 5H19V11.5H11.5V5ZM11.5 12.5H19V19H11.5V12.5Z" fill="white" />
                            </svg>
                            Click me
                        </button>

                        <button
                            className={styles.secondaryButton}
                            onClick={() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Contact me
                        </button>
                    </div>
                </div>

                <div className={styles.rightColumn}>
                    {/* Placeholder illustration for now */}
                    <div className={styles.imageWrapper}>
                        <img src="/November_18_2025_-_1_50PM.jpg" alt="Experience liftoff" className={styles.heroImage} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
