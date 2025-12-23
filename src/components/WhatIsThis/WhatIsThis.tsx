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
    highlight = "Featured Projects",
    description = "Below is a collection of my most practical projects that have been implemented in real-world scenarios."
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
