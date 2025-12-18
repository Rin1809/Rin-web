import React from 'react';
import styles from './WhatIsThis.module.css';

const WhatIsThis: React.FC = () => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <section className={styles.section}>
            <h2 className={styles.title}>What is this ?</h2>
            <div className={styles.contentWrapper}>
                <div className={styles.textContent}>
                    <div className={styles.description}>
                        <span className={styles.highlight}>FortiGate Firewall & Splunk Network Security Deployment</span>
                        This repository documents the end-to-end deployment of a secure network infrastructure for a small business environment. It focuses on configuration and architecture rather than coding. Key features include
                    </div>
                </div>
                <div
                    className={styles.imageWrapper}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <img
                        src={isHovered ? "/c16.png" : "/c17.png"}
                        alt="What is this illustration"
                        className={styles.image}
                    />
                </div>
            </div>
        </section>
    );
};

export default WhatIsThis;
