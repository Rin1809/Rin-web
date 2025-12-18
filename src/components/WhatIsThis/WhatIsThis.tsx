import React from 'react';
import styles from './WhatIsThis.module.css';

interface WhatIsThisProps {
    defaultImage?: string;
    hoverImage?: string;
    highlight?: string;
    description?: string;
}

const WhatIsThis: React.FC<WhatIsThisProps> = ({
    defaultImage = "/c17.png",
    hoverImage = "/c16.png",
    highlight = "FortiGate Firewall & Splunk Network Security Deployment",
    description = "This repository documents the end-to-end deployment of a secure network infrastructure for a small business environment. It focuses on configuration and architecture rather than coding. Key features include"
}) => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <section className={styles.section}>
            <h2 className={styles.title}>What is this ?</h2>
            <div className={styles.contentWrapper}>
                <div className={styles.textContent}>
                    <div className={styles.description}>
                        <span className={styles.highlight}>{highlight}</span>
                        {description}
                    </div>
                </div>
                <div
                    className={styles.imageWrapper}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <img
                        src={isHovered ? hoverImage : defaultImage}
                        alt="What is this illustration"
                        className={styles.image}
                    />
                </div>
            </div>
        </section>
    );
};

export default WhatIsThis;
