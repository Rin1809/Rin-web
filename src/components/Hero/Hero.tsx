import React from 'react';
import styles from './Hero.module.css';

const Hero: React.FC = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <div className={styles.leftColumn}>
                    <div className={styles.logoWrapper}>

                        <span className={styles.brandName}><span className={styles.highlight}>Am</span>  Lynn</span>
                    </div>

                    <h1 className={styles.title}>
                        Rin<br />
                        <span className={styles.titleSub}>o(≧▽≦)o</span>
                    </h1>

                    <div className={styles.actions}>
                        <button
                            className={styles.primaryButton}
                            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }} xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 12H21" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                <path d="M3 6H21" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                <path d="M3 18H21" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M3 5H10.5V11.5H3V5ZM3 12.5H10.5V19H3V12.5ZM11.5 5H19V11.5H11.5V5ZM11.5 12.5H19V19H11.5V12.5Z" fill="white" />
                            </svg>
                            Explore
                        </button>

                        <button
                            className={styles.secondaryButton}
                            onClick={() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            My Social
                        </button>
                    </div>
                </div>

                <div className={styles.rightColumn}>
                    {/* Hinh minh hoa tam thoi, co tien thue artist thi doi */}
                    <div className={styles.imageWrapper}>
                        <img src="/main.jpg" alt="Experience liftoff" className={styles.heroImage} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
