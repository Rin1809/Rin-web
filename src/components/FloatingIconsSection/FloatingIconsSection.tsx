import styles from './FloatingIconsSection.module.css';
import {
    CheckCircle2,
    PenTool,
    Folder,
    LayoutGrid,
    Copy,
    Sparkles,
    Move,
    Braces,
    Code2,
    Maximize2,
    RotateCcw,
    Link2,
    MousePointer2
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const icons = [
    { Icon: MousePointer2, delay: 0, offset: 0 },
    { Icon: CheckCircle2, delay: 1.2, offset: 40 },
    { Icon: PenTool, delay: 2.4, offset: 80 },
    { Icon: Folder, delay: 0.8, offset: 120 }, // Low
    { Icon: LayoutGrid, delay: 3.0, offset: 60 },
    { Icon: Sparkles, delay: 1.5, offset: -20 }, // High
    { Icon: Braces, delay: 4.0, offset: 50 },
    { Icon: Move, delay: 2.2, offset: 100 },
    { Icon: Code2, delay: 0.5, offset: 30 },
    { Icon: Copy, delay: 3.5, offset: 70 },
    { Icon: Maximize2, delay: 1.8, offset: 110 },
    { Icon: RotateCcw, delay: 2.8, offset: 40 },
    { Icon: Link2, delay: 0.0, offset: 0 },
];

const FloatingIconsSection = () => {
    const fullText = "Welcome to my world !!\n\nAs an IT: \n| Networking | Security | System |\n\nI hope i can learn more and more from you...";
    const [displayedText, setDisplayedText] = useState("");
    const [hasStarted, setHasStarted] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasStarted) {
                    setHasStarted(true);
                }
            },
            { threshold: 0.3 } // Start when 30% visible
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, [hasStarted]);

    useEffect(() => {
        if (!hasStarted) return;


        const timer = setInterval(() => {
            setDisplayedText((prev) => {
                // Ensure we don't exceed fullText length
                const nextIndex = prev.length + 1;
                if (nextIndex <= fullText.length) {
                    return fullText.slice(0, nextIndex);
                }
                clearInterval(timer);
                return prev;
            });
        }, 50);

        return () => clearInterval(timer);
    }, [hasStarted]);

    return (
        <section className={styles.section} ref={sectionRef}>
            <div className={styles.contentWrapper}>
                <div className={styles.splitLayout}>
                    {/* Left: GIF */}
                    <div
                        className={styles.gifContainer}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <img
                            src={isHovered ? "/kurumi2.png" : "/kurumi1.png"}
                            alt="Kurumi"
                            className={styles.gif}
                        />
                    </div>

                    {/* Right: Text */}
                    <div className={styles.titleWrapper}>
                        {/* Ghost text to reserve space */}
                        <h2 className={`${styles.title} ${styles.ghost}`}>
                            {fullText.split('\n').map((line, index) => (
                                <span key={index}>
                                    {line}
                                    <br />
                                </span>
                            ))}
                        </h2>

                        {/* Actual animated text overlay */}
                        <h2 className={styles.title}>
                            {displayedText.split('\n').map((line, index) => (
                                <span key={index}>
                                    {line}
                                    {index < displayedText.split('\n').length - 1 && <br />}
                                </span>
                            ))}
                            <span className={styles.cursor}></span>
                        </h2>
                    </div>
                </div>

                <div className={styles.iconsContainer}>
                    {icons.map((item, index) => (
                        <div
                            key={index}
                            className={styles.iconWrapper}
                            style={{
                                transform: `translateY(${item.offset}px)`, // Static wave layout
                            }}
                        >
                            <div
                                className={styles.iconBubble}
                                style={{
                                    animationDelay: `${item.delay}s` // Dynamic floating timing
                                }}
                            >
                                <item.Icon size={40} strokeWidth={1.5} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FloatingIconsSection;
